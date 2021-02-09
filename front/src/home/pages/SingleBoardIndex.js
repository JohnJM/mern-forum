import React, {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import BoardsNav from '../components/BoardsNav';
import { getSingleBoardIndex } from '../../service/BoardService';



const SingleBoardIndex = props => {

    let { board, index } = useParams();
    index = index || 1;

    // console.log(board, index, 'HJERERER');

    useEffect(() =>{
        getSingleBoardIndex(board, index).then(res => {
            console.log('here');
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }, [board, index])


    // console.log(params);

    return (
        <>
            {/* <p>board id selected is {boardId} we are on page {index}</p>
             */}

             <p>{board}</p>

            <BoardsNav />

        </>
    )
}

export default SingleBoardIndex;