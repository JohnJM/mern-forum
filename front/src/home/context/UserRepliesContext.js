import { createContext } from 'react';

export const UserRepliesContext = createContext({
    replyArr: [{}],
    // replyTo should be mongoid. It's optional.
    addOrUpdateReply: (thread_id, content) => {},
    removeReply: (thread_id) => {},
    appendQuoteToReply: (thread_id, replyTo, highlightedText) => {}
})