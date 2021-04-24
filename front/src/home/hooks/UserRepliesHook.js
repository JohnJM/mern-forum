import {useCallback, useReducer} from 'react';


const userRepliesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_REPLY':
            const { thread_id, content } = action;

            state.forEach((userReply, i) => {
                if(userReply.thread_id === thread_id){
                    state.splice(i,1);
                }
            });
            
            return state.concat([{thread_id, content}]);

        case 'REMOVE_REPLY':
            return {

            }

        case 'APPEND_QUOTE_TO_REPLY':
            return {

            }
        
        default: return state;
    }
}

export const useUserReplies = () => {
    const [userRepliesState, dispatch] = useReducer(userRepliesReducer, [] );

    const addOrUpdateReply = useCallback((thread_id, content) => {
        dispatch({
            type: 'ADD_OR_UPDATE_REPLY',
            thread_id: thread_id,
            content: content
        })
    })

    const removeReply = useCallback((thread_id) => {
        
    })

    const appendQuoteToReply = useCallback((thread_id, replyTo, highlightedText) => {
        
    })

    return [userRepliesState, addOrUpdateReply, removeReply];
}
