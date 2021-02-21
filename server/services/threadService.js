const Thread = require('../models/thread');
const Post = require('../models/post');
const Board = require('../models/board');
var ObjectId = require('mongoose').Types.ObjectId;

// A list of threads and their preview replies from a specified index page. Index pages start at 1. The maximum number of pages may vary depending on the board.
module.exports.getThreadsFromIndex = async (boardTitle, page_id /*1-5*/ ) => {
    try {
        const board = await Board.findOne({
            title: boardTitle
        }).exec();  
        let limit = board.per_page || 6;

        const threads = await Thread.find({
            board_id: ObjectId(board._id)
        }).sort({
            createdAt: 'desc'
            //need also change the index 
        }).limit(limit).exec();

        return threads;
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
module.exports.createThread = async (user_id, board) => {

}