import React, {useContext, useEffect, useCallback, useState} from 'react';
// import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'
import {listBoards} from '../../service/BoardService';
import {AuthContext} from '../../shared/context/AuthContext';
import BoardsNav from '../components/BoardsNav';
import SingleBoardIndex from '../components/SingleBoardIndex';
import BoardIndexNav from '../components/BoardPageNav';


const Home = () => {


    const [boardState, setBoardState] = useState({
        boardId: false,
        index: false
    })

    
    const userSelectedBoard = useCallback((boardId) =>  {
        console.log('on home, user selected ', boardId);

        setBoardState({
            boardId: boardId,
            index: 1
        })
        
    }, []);

    const userSelectedIndex = useCallback((pageNo) => {
        setBoardState({
            boardId: boardState.boardId,
            index: pageNo
        })
    }, [])




    return (
        <>
            <BoardsNav selectBoard={userSelectedBoard} />
            <br/>
            <SingleBoardIndex boardInfo={boardState} />
            <BoardIndexNav selectIndex={userSelectedIndex} />
        </>
    )
}

export default Home;