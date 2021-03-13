import React, { useState, useEffect, useCallback } from 'react';

const SinglePost = props => {

const { _id, user_id, thread_id, content } = props.content;

// console.log(props,content);

return <div id={user_id}>
    <p>{content}</p>
</div>
}

export default SinglePost;