import {useCallback, useReducer} from 'react';

const userRepliesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_REPLY':
            {
                const {thread_id, content} = action;

                state.forEach((userReply, i) => {
                    if (userReply.thread_id === thread_id) {
                        state.splice(i, 1);
                    }
                });
                return state.concat([
                    {
                        thread_id,
                        content
                    }
                ]);
            }

        case 'REMOVE_REPLY':
            {
                const {thread_id} = action;

                state.forEach((userReply, i) => {
                    if (userReply.thread_id === thread_id) {
                        state.splice(i, 1);
                    }
                });
                return state;
            }

        case 'APPEND_QUOTE_TO_REPLY':
            {
                const {thread_id, post_id, highlightedText} = action;

                //setup new content to add to state
                const updatedContent = `replyto:${post_id}\n${highlightedText
                    ? '>'
                    : ''}${highlightedText}`;

                let replyExists = false;
                state.forEach((userReply, i) => {
                    if (userReply.thread_id === thread_id) {
                        replyExists = true;
                        // add new content to existing reply
                        state[i].content = `${state[i].content} ${updatedContent}`;
                    }
                });

                return replyExists
                    ? state
                    : state.concat({thread_id, content: updatedContent});
            }

        // case 'EMPTY_REPLY_ARRAY':
        //     return {}

        default:
            return state;
    }
}

export const useUserReplies = () => {
    const [replyArr,
        dispatch] = useReducer(userRepliesReducer, []);

    const addOrUpdateReply = useCallback((thread_id, content) => {
        dispatch({type: 'ADD_OR_UPDATE_REPLY', thread_id, content: content})
    }, [])

    const removeReply = useCallback((thread_id) => {
        dispatch({type: 'REMOVE_REPLY', thread_id})
    }, [])

    const appendQuoteToReply = useCallback((thread_id, post_id, highlightedText) => {
        dispatch({type: 'APPEND_QUOTE_TO_REPLY', thread_id, post_id, highlightedText})
    }, [])

    return [replyArr, addOrUpdateReply, removeReply, appendQuoteToReply];
}
