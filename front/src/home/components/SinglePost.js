import React, { useState, useEffect, useCallback } from 'react';
import { getPublicDataById } from '../../service/UserService';
import { timeAgo } from '../../shared/helper/timeAgo';

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

    return <div className="p-2 pb-4 pt-2" id={user_id}>
        <span className="text-sm text-secondary">{username}</span> <span className="text-sm">({time})</span> <span className="underline underline-color-primary text-sm">{_id}</span> [<span className="text-sm ml-auto text-primary">reply</span>]

    <p className="mt-2 p-1 bg-gray-200 whitespace-pre-line">{comment}</p>
    </div>
}

export default SinglePost;