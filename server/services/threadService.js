const Thread = require('../models/thread');
const Post = require('../models/post');
const Board = require('../models/board');


// A list of threads and their preview replies from a specified index page. Index pages start at 1. The maximum number of pages may vary depending on the board.
module.exports.getThreadsAndPreviewPostsFromIndex = async (board_id, page_id /*1-5*/) => {
    try {
        const limit = await Board.find({ _id: board_id }).exec();

        console.log('board id we want is', limit);

        return limit;

        // const threads = await Thread.find({ });
            
        
    } catch (e) {
        throw e;
    }
}


// A summarized list of all threads on a board

//returns array of {
    // page eg 1
    // threads {
        //thread_id
        //last_modified
        //replies
    //},
    //...
    // 
    //
//}
module.exports.getSummaryOfAllThreads = async (board) => {
    try {
        return Thread.find({})
    } catch (e) {
        throw e;
    }


}

// Create a new thread
module.exports.createThread = async (user_id) => {

}


