import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
// import Thread from '../../../../server/models/thread';
import { getOPAndPosts } from '../../service/ThreadService';
import SinglePost from '../../home/components/SinglePost';
import BoardsNav from '../components/BoardsNav';


import { AppConfig } from '../../App.config';


const SingleThreadAndPosts = (props) => {
   const { board, thread } = useParams();
   const [ isFullThreadImage,  setIsFullThreadImage] = useState(false);
   
   //let location = useLocation();
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
         <BoardsNav />
               <div className="block mb-8">
                  <span className="text-2xl text-primary">{opContent.subject}</span>
                  <span className="text-2xl"> | {board} | </span>
                  <span className="text-2xl text-secondary"> {opContent.author.username || 'anonymous user'} </span>
               </div>
         <div class={`flex ${isFullThreadImage ? 'flex-col' : 'flex-row'}`}>
            <div class="mb-8">
                  <img onClick={() => setIsFullThreadImage(!isFullThreadImage)} class={`${!isFullThreadImage && 'max-w-250'}`} src={`${AppConfig.apiUrl}/${opContent.image}`} alt={opContent.subject}/>
                  <p>{opContent.content}</p>
            </div>

            <div class={`flex flex-col flex-grow ${!isFullThreadImage && 'pl-4'}`} >
               {postsArr.length > 0 && postsArr.map(post => <div key={post._id} className="mb-4 w-full border-2 border-primary">
                     <SinglePost key={post._id} content={post}/>
                  </div>
               )}
         </div>
         </div>
      </>
   }
}



export default SingleThreadAndPosts;

//todo


   //break this into smaller components?
   //useFullImage could be a hook - reused on <SinglePost /> too? (instead of line 18)