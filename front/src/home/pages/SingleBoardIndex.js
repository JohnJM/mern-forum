import React, {useContext, useEffect, useState} from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import BoardsNav from '../components/BoardsNav';
import { getSingleBoardIndex } from '../../service/BoardService';
import SingleThread from '../components/SingleThread';
import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import CreateThread from '../components/CreateThread';
 
const SingleBoardIndex = props => {

    let { board, index } = useParams();
    const side = useContext(SideDrawerContext);
    index = index || 1;

    const { status, data, error, isFetching } = useQuery(['threads', [board, index]], () => getSingleBoardIndex(board, index))

    let mainContent;

    if(status === 'loading'){
       mainContent  = <p class="mt-4">loading</p>
    } else if(status === 'error'){
       mainContent = <p className="mt-4">error - {error.message} </p>
    } else {
        mainContent = data.length === 0 ? <p className="mt-8">No threads.</p> : <div className="mt-8">
            {data.map(thread => {
                return <SingleThread key={thread._id} content={thread}/>
            })}
        </div>
    }

    return (
        <>
            <BoardsNav />
            {isFetching ? <p>Fetching</p> : null}
            <p>
                <span className="text-2xl">{board}</span>
                - [<span onClick={() => side.displayContent(<CreateThread board={board}/>)} className="text-primary cursor-pointer">Start a new {board} thread</span>]
            </p>
            <p></p>
            {mainContent}
        </>
    )
}

export default SingleBoardIndex;