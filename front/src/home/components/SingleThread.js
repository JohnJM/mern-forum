import React, { useState, useEffect, useCallback } from 'react';
import { getPublicDataById } from '../../service/UserService';
import {AppConfig} from '../../App.config';

const parse = require('html-dom-parser');

const SingleThread = props => {
    
    const { content: thread } = props;


    const [threadOP, setOP] = useState('Anonymous');
    const [content, setContent] = useState([]);

    useEffect(()=>{
        if(thread.user_id){
            getPublicDataById(thread.user_id).then(res => {
                setOP(res.data.username);
            })
        }
    }, [])

    const isoDate = new Date(thread.createdAt);
    let date = isoDate.toISOString().substring(0, 10);

    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

    date = date + ' (' + days[isoDate.getDay()] + ') ';

    date = date + isoDate.toLocaleTimeString();


    return <>
        <div className="border-2 border-secondary container mb-3 py-2 px-4 text-black">

            <div>
                <img src={`${AppConfig.apiUrl}/${thread.image}`}/>
            </div>


            <div>
           <span className="text-primary"> {thread.subject}</span> |    {threadOP} | {date}
            </div>
            <br/>
            <div>
                {thread.content}
            </div>
        </div>
    </>
}

export default SingleThread;