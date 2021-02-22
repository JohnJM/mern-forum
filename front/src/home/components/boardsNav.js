import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
// import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'
import {listBoards} from '../../service/BoardService';
import {AuthContext} from '../../shared/context/AuthContext';

const BoardsNav = () => {

    // const auth = useContext(AuthContext);

    let [boardList,
        setBoardList] = useState(null);

    useEffect(() => {
        listBoards().then(res => {
            setBoardList(res.data.boards);
        }).catch(err => {
            console.log(`error ${err}`);

        })
    }, [])

    if (!boardList) {
        return <p className="text-right">loading boards</p>;
    }

    

    return (
        <div>
            <ul className="flex justify-end">{boardList.map((board, i) => {
                return (

                    <li 
                        className={`mx-3 underline decoration-color-primary cursor-pointer
                        ${boardList.length === i + 1 ? ' mr-0' : null} 
                        ${i === 0 ? 'ml-0' : null}`}
                        key={board._id}
                    >
                        <NavLink to={{pathname: `/board/${board.title}`, state:
                             {board_id: board._id}
                        }}>
                            {board.title}
                        </NavLink>
                    </li>
                )
                })}
            </ul>
        </div>
    )
}

export default BoardsNav;