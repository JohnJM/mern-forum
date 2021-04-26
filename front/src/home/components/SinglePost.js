import React, { useState, useContext } from 'react';
import { getPublicDataById } from '../../service/UserService';
import { timeAgo } from '../../shared/helper/timeAgo';
import parse, { domToReact }  from 'html-react-parser';
import { SideDrawerContext } from '../../shared/context/SideDrawerContext';
import { UserRepliesContext } from '../context/UserRepliesContext';


const SinglePost = props => {

    const side = useContext(SideDrawerContext);
    const userReplies = useContext(UserRepliesContext);

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
        let id = event.target.innerHTML.substring(8);
        props.viewReply(id);
    }

    const handleReply = (reply_id) => {
        console.log('herp');
    } 

    // parse comment for quotes and replies should have been done on the server I think. I've gone too far with this approach now but should be refactored. 
    const formatComment = (comment) => {
        let parsedComment = comment;

        const replyToRegex = /replyto:(.*)/g;
        const quoteRegex = /(.*)?(>.*)/g;
        const removeHTML  = /<[^>]*>/; //I am sure this one is not good. But it seems to stop users outputting real markup in comments from what I can tell.

        parsedComment = parsedComment.replace(removeHTML, '');

        //style >quotes within a comment
        parsedComment = parsedComment.replace(quoteRegex,`<span class="text-green-700">$&</span>`);

        //replying to comments
        parsedComment = parsedComment.replace(replyToRegex,`<span class="postReplyTo"><a href="#$1">[<span class="text-sm cursor-pointer text-secondary  $&">$&</span>]</a></span>`).replace('replyto:', '');

        return parsedComment;
    }

    return <div className="p-2 pb-0" id={user_id}>
        <span className="text-sm text-secondary">{username}</span> <span className="text-sm">({time})</span> <span className="underline underline-color-primary text-sm">{_id}</span> [<span onClick={()=> handleReply(_id)} className="cursor-pointer text-sm ml-auto text-primary">Reply</span>]

        <div className="mt-2 p-1 pb-2 bg-gray-200 whitespace-pre-line leading-4">
        
            {parse(formatComment(comment), {
                replace: ({ attribs, children }) => {
                    if(attribs && attribs.class === 'postReplyTo'){
                        return <span 
                        className="postReplyTo block"
                        onClick={(e)=> handleViewReply(e)}>
                            {domToReact(children)}
                        </span>
                    }
                }
            })}

        </div>
    </div>
}

export default SinglePost;