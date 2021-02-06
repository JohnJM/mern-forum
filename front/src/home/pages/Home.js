import React, {useContext, useEffect, useState} from 'react';
// import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'
import {listBoards} from '../../service/BoardService';
import {AuthContext} from '../../shared/context/AuthContext';
import BoardsNav from '../components/boardsNav';

const Home = () => {


    return (
        <>
        <BoardsNav />
          <p>Home hit!</p>
        </>
    )
}

export default Home;