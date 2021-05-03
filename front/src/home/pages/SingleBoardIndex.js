import React, {useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query'
import {useParams} from "react-router-dom";
import BoardsNav from '../components/BoardsNav';
import {getSingleBoardIndex} from '../../service/BoardService';
import SingleThread from '../components/SingleThread';
import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import CreateThread from '../components/CreateThread';
import {useLocation} from 'react-router-dom';

const SingleBoardIndex = props => {

    let {board, index} = useParams();
    const side = useContext(SideDrawerContext);
    index = index || 1;
    let location = useLocation();
    const {board_title, board_id} = location.state

    const {status, data, error, isFetching, refetch} = useQuery([
        'threads',
        [board, index]
    ], () => getSingleBoardIndex(board, index))

    //could probably just be in the return instead.
    let mainContent;

    if (status === 'loading') {
        mainContent = <p className="mt-4">loading</p>
    } else if (status === 'error') {
        mainContent = <p className="mt-4">error - {error.message}
        </p>
    } else {
        mainContent = data.length === 0
            ? <p className="mt-8">No threads.</p>
            : <div className="mt-8">
                {data.map(thread => {
                    return <SingleThread key={thread._id} content={thread} board_title={board_title}/>
                })}
            </div>
    }

    return (
        <React.Fragment>
            <BoardsNav/> {isFetching
                ? <p>Fetching</p>
                : null}
            <p className="mt-6">
                <span className="text-4xl mr-2">{board}</span>
                [<span
                    onClick={() => side.displayContent(<CreateThread refresh={refetch} board_title={board_title} board_id={board_id}/>)}
                    className="text-primary cursor-pointer">Start a new {board_title} thread</span>]
            </p>
            {mainContent}
        </React.Fragment>
    )
}

export default SingleBoardIndex;