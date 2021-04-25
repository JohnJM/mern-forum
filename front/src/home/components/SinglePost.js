import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { getPublicDataById } from '../../service/UserService';
import { timeAgo } from '../../shared/helper/timeAgo';
import parse, { domToReact }  from 'html-react-parser';

const SinglePost = props => {

    const { _id, user_id, createdAt, comment } = props.content;
    const time = timeAgo(new Date(createdAt));

    let [username, setUsername] = useState('not-registered');

    if (user_id) {
        getPublicDataById(user_id).then(res => {
            setUsername(res.data.username);
        }).catch((err) => {
            throw err;
        });
    }

    // for clicking replyto

    const handleViewReply = (event) => {
        let id = event.target.innerHTML.substring(9);
        props.viewReply(id);
    }

    // parse comment for quotes and replies should have been done on the server I think. I've gone too far with this approach now but should be refactored. 
    const formatComment = (comment) => {
        let parsedComment = comment;

        const replyToRegex = /(?<=replyto:).*?(?=\s)/;
        const quoteRegex = /(.*)?(>.*)/g;

        //style >quotes within a comment
        parsedComment = parsedComment.replace(quoteRegex,`<span class="text-green-700">$&</span>`);

        //replying to comments
        parsedComment = parsedComment.replace(replyToRegex,`<span data-replyto="$&" class="postReplyTo"><a href="#$&">[<span class="text-sm cursor-pointer text-secondary  $&">replyto: $&</span>]</a></span>`).replace('replyto:', '');

        return parsedComment;
    }

    return <div className="p-2 pb-4 pt-2" id={user_id}>
        <span className="text-sm text-secondary">{username}</span> <span className="text-sm">({time})</span> <span className="underline underline-color-primary text-sm">{_id}</span> [<span className="text-sm ml-auto text-primary">reply</span>]

        <p className="mt-2 p-1 bg-gray-200 whitespace-pre-line leading-4">
        
            {parse(formatComment(comment), {
                replace: ({ attribs, children }) => {
                    if(attribs && attribs.class === 'postReplyTo'){
                        return <span 
                        className="postReplyTo block "
                        onClick={(e)=> handleViewReply(e)}>
                            {domToReact(children)}
                        </span>
                    }
                }
            })}

        </p>
    </div>
}

export default SinglePost;