import React, {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import BoardsNav from '../components/BoardsNav';



const SingleBoardIndex = props => {

    const { board, index } = useParams();
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