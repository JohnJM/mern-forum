import React, { useState, useEffect, useCallback } from 'react';
import { getPublicDataById } from '../../service/UserService';

const SinglePost = props => {

const { _id, user_id, thread_id, comment } = props.content;

//should use user object with everything instead of string
let [username, setUsername] = useState('not-registered');

if(user_id){
    getPublicDataById(user_id).then(res => {
        // console.log(res);
        setUsername(res.data.username);
    }).catch((err)=> {
        throw err;
    });
}

return <div className="p-4" id={user_id}>
    <p>{username} - {_id} </p>
    <p className="mt-2 p-1 bg-gray-200 whitespace-pre-line">{comment}</p>
</div>
}

export default SinglePost;