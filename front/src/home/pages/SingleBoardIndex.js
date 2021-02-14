import React, {useContext, useEffect, useState} from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import BoardsNav from '../components/BoardsNav';
import { getSingleBoardIndex } from '../../service/BoardService';
import SingleThread from '../components/SingleThread';



const SingleBoardIndex = props => {

    let { board, index } = useParams();
    index = index || 1;

    const { status, data, error, isFetching } = useQuery(['threads', [board, index]], () => getSingleBoardIndex(board, index))

    let mainContent;

    if(status === 'loading'){
       mainContent  = <p>loading</p>
    } else if(status === 'error'){
       mainContent = <p>error - {error.message} </p>
    } else {
        console.log(data);

        return (
            <>
                {/* <p>gaming</p> */}
                <BoardsNav />

                {isFetching ? <p>Fetching</p> : null}
                
                {data.length === 0 ? <p>No threads. Sad</p> : <div className="mt-8">
                    {data.map(thread => {
                        return <SingleThread key={thread._id} content={thread}/>
                    })}
                </div>}
            </>
        )
    }




    //instead, i want to do useGetSingleBoardIndex
    // useEffect(() =>{
    //     getSingleBoardIndex(board, index).then(res => {
    //         console.log('here');
    //         console.log(res);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, [board, index])


    // console.log(params);

    // return (

    // )
}

export default SingleBoardIndex;