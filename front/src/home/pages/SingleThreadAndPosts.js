import React, {useState, useEffect, useCallback, useContext, useRef} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useQuery} from 'react-query'
// import Thread from '../../../../server/models/thread';
import {getOPAndPosts} from '../../service/ThreadService';
import SinglePost from '../../home/components/SinglePost';
import CreatePost from '../../home/components/CreatePost';
import BoardsNav from '../components/BoardsNav';

import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {UserRepliesContext} from '../context/UserRepliesContext';

import {AppConfig} from '../../App.config';
import {useSideDrawer} from '../../shared/hooks/SideDrawerHook';
import Backdrop from '../../shared/components/ui/Backdrop';

const SingleThreadAndPosts = (props) => {
    const {board, thread} = useParams();
    const [isFullThreadImage,
        setIsFullThreadImage] = useState(false);
    const [highligtedPost,
        setHighlightedPost] = useState(false);
    const [isViewed,
        setIsViewed] = useState(false);
    const side = useContext(SideDrawerContext);
    const userReplies = useContext(UserRepliesContext);

    let foundReply = useRef(false);

    const createPostInputHandler = (...post) => {
        userReplies.addOrUpdateReply(thread, post[1]);
    }

    userReplies
        .replyArr
        .forEach(r => {
            if (r.thread_id === thread) {
                foundReply.current = r.content;
            }
        })

    const setCreatePost = (initContent = false) => {

        // Instead have function with a var

        if (!initContent) {
            side.setContent(<CreatePost
                refresh={refetch}
                updateCreatePostContent={(...i) => createPostInputHandler(...i)}
                initReplyContent={foundReply.current}
                clearReplyContent={() => {
                foundReply.current = ''
            }}
                thread_id={thread}/>);
            side.toggleOpen();
        } else {

            side.setContent(<CreatePost
                refresh={refetch}
                updateCreatePostContent={(...i) => createPostInputHandler(...i)}
                initReplyContent={initContent}
                clearReplyContent={() => {
                foundReply.current = ''
            }}
                thread_id={thread}/>);
            side.toggleOpen();
        }
    }

    let opContent = {};
    let postsArr = [];

    const {status, data, refetch} = useQuery(['OPAndPosts', ['thread_id']
    ], () => getOPAndPosts(thread));

    if (status === 'loading') {
        return 'loading';
    } else if (status === 'error') {
        return 'error';
    } else {
        opContent = data.data.OP;
        postsArr = data.data.Posts;

        let floatingPosts = [];
        let remainingPosts = [];

        for (let i = 0; i < postsArr.length; i++) {
            if (i < 2) {
                floatingPosts.push(postsArr[i])
            } else if (i >= 2) {
                remainingPosts.push(postsArr[i])
            }
        }

        const handleViewReply = (reply_id) => {
            console.log('here.', reply_id)
            setIsViewed({id: reply_id});
            setTimeout(() => {
                setIsViewed(false)
            }, 3000);
        }

        const handleHighlightUserPosts = (user_id) => {
            setHighlightedPost(user_id);
        }

        const singlePostGenerator = (post) => {
            return <SinglePost
                highlightUserPosts={(user_id) => handleHighlightUserPosts(user_id)}
                setCreatePost={(content) => {
                setCreatePost(content)
            }}
                viewReply={(id) => handleViewReply(id)}
                key={post._id}
                content={post}/>
        }

        return <React.Fragment>
            <BoardsNav/>
            <div className="block mb-8">
                <p className="text-4xl my-6">{board}</p>
                <span className="text-2xl text-primary">{opContent.subject}</span>
                <span className="text-2xl">
                    |
                </span>
                <span className="text-2xl text-secondary">
                    {opContent.author.username || 'not-registered'}
                </span>
                <span>
                    - [
                    <span className="text-primary cursor-pointer" onClick={() => setCreatePost()}>
                        Post a reply
                    </span>]
                </span>
            </div>

            <div
                className={`flex-col flex ${isFullThreadImage
                ? 'sm:flex-col'
                : 'sm:flex-row'}`}>
                <div className="mb-8">
                    <img
                        onClick={() => setIsFullThreadImage(!isFullThreadImage)}
                        className={`cursor-pointer ${ !isFullThreadImage && 'max-w-250'}`}
                        src={`${AppConfig.apiUrl}/${opContent.image}`}
                        alt={opContent.subject}/>
                    <p>{opContent.content}</p>
                </div>

                <div className={`flex flex-col flex-grow ${ !isFullThreadImage && 'sm:pl-4'}`}>
                    {floatingPosts.length > 0 && floatingPosts.map(post => <div
                        key={post._id}
                        className={`${post.user_id === highligtedPost && 'z-50'} mb-4 w-full border-b-2 border-primary bg-gray-100 ${isViewed.id === post._id && 'animate__heartBeat'} `}
                        id={post._id}>
                        {singlePostGenerator(post)}
                    </div>)}
                </div>
            </div>

            {remainingPosts && <div>
                <div className="flex flex-col">
                    {remainingPosts.map(post => <div
                        key={post._id}
                        className={`${post.user_id === highligtedPost && 'z-50'} mb-4 w-full border-b-2 border-primary bg-gray-100 ${isViewed.id === post._id && 'animate__heartBeat'}`}
                        id={post._id}>
                        {singlePostGenerator(post)}
                    </div>)}
                </div>
            </div>}

            {!!highligtedPost && <Backdrop onClick={() => setHighlightedPost(false)}/>}

        </React.Fragment>
    }
}

export default SingleThreadAndPosts;
