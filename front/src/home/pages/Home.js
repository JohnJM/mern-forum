import React, {useEffect, useState} from 'react';
// import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'
import {listBoards} from '../../service/BoardService';

const Home = () => {

  let [boardList, setBoardList] = useState(null);

    
    useEffect(() => {
        listBoards().then(res => {
           setBoardList(res.data.boards);
        }).catch(err => {
            console.log(`error ${err}`);
            
        })
    },[])


    if (!boardList){
        return 'loading boards'
    }
    
    console.log(boardList);

    return (
        <div>
            <p>home works, list of boards below</p>

           <ul>{boardList.map(board => {
               return (<li key={board._id}>{board.title}</li>)
           })} </ul>

        </div>
    )
}

export default Home;