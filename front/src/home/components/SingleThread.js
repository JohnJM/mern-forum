import React from 'react';

const SingleThread = props => {
    
    console.log('in single thread', props);

    const { content: thread } = props;

    console.log(thread);

    return <>
        <div className="bg-pink-400 container mb-3 py-2 px-4">

            <div>
                subject - {thread.subject}
            </div>

            <div>
                content - {thread.content}
            </div>
        </div>
    </>


}

export default SingleThread;