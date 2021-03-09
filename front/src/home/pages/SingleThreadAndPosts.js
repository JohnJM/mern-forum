import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
// import Thread from '../../../../server/models/thread';
import { getOPAndPosts } from '../../service/ThreadService';
import SinglePost from '../../home/components/SinglePost';

import { AppConfig } from '../../App.config';






const SingleThreadAndPosts = (props) => {


    const { board, thread } = useParams();

    let location = useLocation();
    // const { board_title, thread_id } = location.state;
    let opContent = {};
    let postsArr = [];

    const { status, data, error, isFetching, refetch } = useQuery(['OPAndPosts', ['thread_id']], () => getOPAndPosts(thread));

    if(status === 'loading'){
        return 'loading';
     } else if(status === 'error'){
        return 'error';
     } else {
        opContent = data.data.OP;
        postsArr = data.data.Posts;

        
        console.log(data.data);
        return <>
            <div>
                <img src={`${AppConfig.apiUrl}/${opContent.image}`} alt={opContent.subject}/>
                <h1>{opContent.subject}</h1>
                <p>{opContent.content}</p>
            </div>

            
            
            {postsArr.length > 0 && postsArr.map(post => <SinglePost content={post}/>) }
        </>



     }
}



export default SingleThreadAndPosts;