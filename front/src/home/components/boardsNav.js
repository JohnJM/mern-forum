import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {listBoards} from '../../service/BoardService';

const BoardsNav = () => {

    let [boardList,
        setBoardList] = useState(null);

    useEffect(() => {
        listBoards().then(res => {
            setBoardList(res.data.boards);
        }).catch(err => {
            throw Error(err);
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
                            className={`mx-3 underline decoration-color-primary cursor-pointer ${boardList.length === i + 1 && ' mr-0'} ${i === 0 && 'ml-0'}`}
                            key={board._id}>
                            <NavLink
                                activeClassName="text-primary active"
                                to={{
                                pathname: `/board/${board.title}`,
                                state: {
                                    board_id: board._id,
                                    board_title: board.title
                                }
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