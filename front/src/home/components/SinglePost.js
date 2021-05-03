import React, {useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getPublicDataById} from '../../service/UserService';
import {timeAgo} from '../../shared/helper/timeAgo';
import parse, {domToReact} from 'html-react-parser';
import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {UserRepliesContext} from '../context/UserRepliesContext';
import CreatePost from './CreatePost';

const SinglePost = props => {

    const {thread} = useParams();

    const side = useContext(SideDrawerContext);
    const userReplies = useContext(UserRepliesContext);

    const {_id, user_id, createdAt, comment} = props.content;
    const time = timeAgo(new Date(createdAt));

    const [isNewReply,
        setIsNewReply] = useState(false);

    let [username,
        setUsername] = useState('not-registered');

    if (user_id) {
        getPublicDataById(user_id).then(res => {
            setUsername(res.data.username);
        }).catch((err) => {
            throw err;
        });
    }

    // for clicking replyto
    const handleViewReply = (event) => {
        let id = event
            .target
            .innerHTML
            .substring(8);
        props.viewReply(id);
    }

    useEffect(() => {
        if (userReplies.replyArr.length !== 0 && isNewReply) {
            userReplies
                .replyArr
                .forEach(reply => {
                    if (reply.thread_id === thread) {
                        props.setCreatePost(reply.content);
                    }
                });

            setIsNewReply(false);
        }

    }, [userReplies.replyArr, thread, isNewReply, props])

    const handleReply = (reply_id, thread_id, highlightedText) => {
        userReplies.appendQuoteToReply(reply_id, thread_id, highlightedText);
        setIsNewReply(true);
    }

    // parse comment for quotes and replies should have been done on the server I
    // think. I've gone too far with this approach now but should be refactored.
    const formatComment = (comment) => {
        let parsedComment = comment || '';

        const replyToRegex = /replyto:(.*)/g;
        const quoteRegex = /(.*)?(>.*)/g;
        const removeHTML = /<[^>]*>/; //I am sure this one is not good. But it seems to stop users outputting real markup in comments from what I can tell.

        parsedComment = parsedComment.replace(removeHTML, '');

        //style >quotes within a comment
        parsedComment = parsedComment.replace(quoteRegex, `<span class="text-green-700">$&</span>`);

        //replying to comments
        parsedComment = parsedComment
            .replace(replyToRegex, `<span class="postReplyTo"><a href="#$1">[<span class="text-sm cursor-pointer text-secondary  $&">$&</span>]</a></span>`)
            .replace('replyto:', '');

        return parsedComment;
    }

    const handleOpenUser = (user_id) => {
        props.highlightUserPosts(user_id);
    }

    return <div className="p-2 pb-0" id={user_id}>
        {user_id && '['}<span
            onClick={() => handleOpenUser(user_id)}
            className={`text-sm ${user_id && 'cursor-pointer'} text-secondary`}>{username}</span>{user_id && ']'} 
        <span className="text-sm mx-1">
            ({time}) 
        </span>
        <span className="underline underline-color-primary text-sm">{_id}</span>
        [<span
            onMouseDown={() => handleReply(thread, _id, window.getSelection().toString())}
            className="cursor-pointer text-sm ml-auto text-primary">Reply</span>]

        <div className="mt-2 p-1 pb-2 bg-gray-200 whitespace-pre-line leading-4">
            {parse(formatComment(comment), {
                replace: ({attribs, children}) => {
                    if (attribs && attribs.class === 'postReplyTo') {
                        return <span className="postReplyTo block" onClick={(e) => handleViewReply(e)}>
                            {domToReact(children)}
                        </span>
                    }
                }
            })}

        </div>
    </div>
}

export default SinglePost;