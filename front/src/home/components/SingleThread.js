import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { getPublicDataById } from '../../service/UserService';
import { AppConfig } from '../../App.config';
const parse = require('html-dom-parser');

const SingleThread = props => {

    const { content: thread, board_title } = props;

    const [threadOP, setOP] = useState('not registered');
    const [content, setContent] = useState([]);

    useEffect(() => {
        if (thread.user_id) {
            getPublicDataById(thread.user_id).then(res => {
                setOP(res.data.username);
            })
        }
    }, [thread.user_id])

    const isoDate = new Date(thread.createdAt);
    let date = isoDate.toISOString().substring(0, 10);

    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

    date = date + ' (' + days[isoDate.getDay()] + ') ';

    date = date + isoDate.toLocaleTimeString();

    function ThreadContent(props) {
        const { content } = props;
        const formatContent = content.split('\n').map((str, i) => <p key={i}>{str}</p>);
        return formatContent;
    }

    return <>
        <div className="border-2 border-secondary container mb-3 py-2 px-4 text-black flex">
            <div className="max-w-250">
                <img src={`${AppConfig.apiUrl}/${thread.image}`} alt={thread.image.split('/')[2]} />
            </div>
            <div className="w-3/4 pl-2">
                <div>
                    <span className="text-primary"> {thread.subject}</span> |    <span className="text-secondary">{threadOP}</span> | {date} [<NavLink className="text-primary" to={{
                        pathname: `/board/${board_title}/thread/${thread._id}`,
                        state: {
                            board_title,
                            thread_id: thread._id
                        }
                    }
                    }>Reply</NavLink>]
                </div>

                <br />

                <div>
                    <ThreadContent content={thread.content} />
                </div>
            </div>
        </div>
    </>
}

export default SingleThread;