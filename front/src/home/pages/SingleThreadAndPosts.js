import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
// import Thread from '../../../../server/models/thread';
import { getOPAndPosts } from '../../service/ThreadService';
import SinglePost from '../../home/components/SinglePost';
import CreatePost from '../../home/components/CreatePost';
import BoardsNav from '../components/BoardsNav';
import { SideDrawerContext } from '../../shared/context/SideDrawerContext';

import { AppConfig } from '../../App.config';
import { useSideDrawer } from '../../shared/hooks/SideDrawerHook';

const SingleThreadAndPosts = (props) => {
   const { board, thread } = useParams();
   const [ isFullThreadImage,  setIsFullThreadImage] = useState(false);
   const side = useContext(SideDrawerContext);

   const CreatePostContent = useRef({
      inputs: {
         options:{
            value: '',
            isValid: true
         },
         comment: {
            value: '',
            isValid: false 
         }
      },
      isValid: false
   }, );

   const createPostInputHandler = (...post) => {
      CreatePostContent.current = {inputs: {
         options: {
            value: post[0],
            isValid: true
         },
         comment: {
            value: post[1],
            isValid: true
         }
      }, isValid: true}
   }

   const setCreatePost = () => {
      side.setContent(
      <CreatePost 
        refresh={refetch}
        updateCreatePostContent={(...i) => createPostInputHandler(...i)}
        initFormState={CreatePostContent.current} 
        thread_id={thread}
      />);
      side.toggleOpen(); 
   }
   
   let opContent = {};
   let postsArr = [];

   const { status, data, refetch } = useQuery(['OPAndPosts', ['thread_id']], () => getOPAndPosts(thread));

   if(status === 'loading'){
      return 'loading';
   } else if(status === 'error'){
      return 'error';
   } else {
      opContent = data.data.OP;
      postsArr = data.data.Posts;


      let floatingPosts = []; let remainingPosts = [];

      for(let i = 0; i < postsArr.length; i++){
         if(i < 2){
            floatingPosts.push(postsArr[i])
         } else if (i >= 2){
            remainingPosts.push(postsArr[i])
         }
      }
   
      return <>
         <BoardsNav />
            <div className="block mb-8">
               <span className="text-2xl text-primary">{opContent.subject}</span>
               <span className="text-2xl"> | {board} | </span>
               <span className="text-2xl text-secondary"> {opContent.author.username || 'not-registered'} </span>
               <span> - [
                  <span 
                     class="text-primary cursor-pointer" 
                     onClick={()=>setCreatePost()}>
                     Post a reply
                  </span>]
               </span>
            </div>

             <div className={`flex-col flex ${isFullThreadImage ? 'sm:flex-col' : 'sm:flex-row'}`}>
               <div className="mb-8">
                     <img onClick={() => setIsFullThreadImage(!isFullThreadImage)} className={`${!isFullThreadImage && 'max-w-250'}`} src={`${AppConfig.apiUrl}/${opContent.image}`} alt={opContent.subject}/>
                     <p>{opContent.content}</p>
               </div>

               <div className={`flex flex-col flex-grow ${!isFullThreadImage && 'sm:pl-4'}`} >
                {floatingPosts.length > 0 && floatingPosts.map(post => <div key={post._id} className="mb-4 w-full border-2 border-primary">
                     <SinglePost key={post._id} content={post}/>
                  </div>
               )}
               </div>
             </div>

             {remainingPosts && <div>
               <div class="flex flex-col">
                  {remainingPosts.map(post => <div key={post._id} className="mb-4 w-full border-2 border-primary">
                     <SinglePost key={post._id} content={post}/>
                  </div>)}
               </div>
             </div>}
      </>
   }
}

export default SingleThreadAndPosts;

//todo


   //break this into smaller components?
   //useFullImage could be a hook - reused on <SinglePost /> too? (instead of line 18)