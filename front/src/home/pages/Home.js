import React, {useContext, useEffect, useCallback, useState} from 'react';
// import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'
import {listBoards} from '../../service/BoardService';
import {AuthContext} from '../../shared/context/AuthContext';
import BoardsNav from '../components/BoardsNav';
import BoardIndexNav from '../components/BoardIndexNav';


const Home = () => {

    return (
        <>
            <p className="text-right">Home hit. Choose a board below</p>

            <BoardsNav />
            <br/>
            {/* <SingleBoardIndex boardInfo={boardState} /> */}
            {/* <BoardIndexNav selectIndex={userSelectedIndex} /> */}
        </>
    )
}

export default Home;