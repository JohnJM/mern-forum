import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {getPublicDataById} from '../../service/UserService';
import {timeAgo} from '../../shared/helper/timeAgo';
import parse, {domToReact} from 'html-react-parser';
import {hexToLightOrDark} from '../../shared/helper/hexToLightOrDark';

import {AuthContext} from '../../shared/context/AuthContext';

import {UserRepliesContext} from '../context/UserRepliesContext';
import CreatePost from './CreatePost';

const SinglePost = props => {

    const {thread} = useParams();
    const usernameSpan = useRef();
    const auth = useContext(AuthContext);

    // const side = useContext(SideDrawerContext);
    const userReplies = useContext(UserRepliesContext);

    const {_id, user_id, createdAt, comment} = props.content;
    const time = timeAgo(new Date(createdAt));

    const [isNewReply,
        setIsNewReply] = useState(false);

    let [username,
        setUsername] = useState('not-registered');

    // for clicking replyto
    const handleViewReply = (event) => {
        let id = event
            .target
            .innerHTML
            .substring(8); //
        props.viewReply(id);
    }

    // set content of post to be added into sidebar if they reply to it.
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

    //append "replyto" onto current reply
    const handleReply = (reply_id, thread_id, highlightedText) => {
        userReplies.appendQuoteToReply(reply_id, thread_id, highlightedText);
        setIsNewReply(true);
    }

    const formatComment = (comment) => {
        let parsedComment = comment || '';

        const replyToRegex = /replyto:(.*)/g;
        const quoteRegex = /(.*)?(>.*)/g;
        const removeHTML = /<[^>]*>/; //There's probably a method for a dev to get around this and still inject markup onto page. Not good.

        parsedComment = parsedComment.replace(removeHTML, '');

        //style >quotes within a comment
        parsedComment = parsedComment.replace(quoteRegex, `<span class="text-green-700">$&</span>`);

        //add reply to comments buttons
        parsedComment = parsedComment
            .replace(replyToRegex, `<span class="postReplyTo"><a href="#$1">[<span class="text-sm cursor-pointer text-secondary  $&">$&</span>]</a></span>`)
            .replace('replyto:', '');

        return parsedComment;
    }

    // highlight / "open" all posts by a user
    const handleOpenUser = (user_id) => {
        props.highlightUserPosts(user_id);
    }

    // highlight a username with preferred colour
    useEffect(() => {
        let mounted = true;
        if (props.content.user_id) {
            getPublicDataById(props.content.user_id).then(doc => {
                setUsername(doc.data.username);

                if (mounted && usernameSpan.current) {

                    usernameSpan.current.style.backgroundColor = doc.data.colour;
                    usernameSpan.current.style.color = hexToLightOrDark(doc.data.colour, '#ffffff', '#000000');
                }

            }).catch((e) => {
                throw Error(`${e}, User id: ${props.content.user_id}`)
            })
        }

        return () => mounted = false;

        // without thread as dependency the effect will not trigger on loading a
        // different thread which creates warning / memory leak.
    }, [user_id, auth, props.content.user_id, thread])

    return <div className="p-2 pb-0" id={user_id}>
        {user_id && '['}<span
            ref={usernameSpan}
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