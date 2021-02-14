import React, { useState, useEffect } from 'react';
import { getPublicDataById } from '../../service/UserService';

const SingleThread = props => {
    
    console.log('in single thread', props);

    const { content: thread } = props;

    const [threadOP, setOP] = useState('Anonymous')

    useEffect(()=>{
        getPublicDataById(thread.user_id).then(res => {
            setOP(res.data.username);
        })
    }, [])



    console.log(thread);

    return <>
        <div className="bg-secondary container mb-3 py-2 px-4 text-white">
            <div>
                Author id - {threadOP}
            </div>
            <br/>
            <div>
                subject - {thread.subject}
            </div>

            <div>
                content - {thread.content}
            </div>

            <div>
                date created - {thread.createdAt}
            </div>
        </div>
    </>


}

export default SingleThread;