import React, {useContext, useEffect, useState} from 'react';


const SingleBoardIndex = props => {

    const {boardId, index} = props.boardInfo;

    return (
        <>
            <p>board id selected is {boardId} we are on page {index}</p>
        </>
    )
}

export default SingleBoardIndex;