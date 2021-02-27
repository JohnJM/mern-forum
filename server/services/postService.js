const Post = require('../models/post');
const Thread = require('../models/Thread');


// A list of threads and their preview replies from a specified index page. Index pages start at 1. The maximum number of pages may vary depending on the board.
module.exports.getOPAndPosts = async (thread_id) => {
    try {

        let OP; let listOfPosts = [];

        OP = await Thread.findById(thread_id);
        let listOfPosts = Post.findById({thread_id});
        console.log(OP);

        return OP;

    } catch (e) {
        throw e;
    }
}

module.exports.createPost = async (user_id) => {
    try {
        return Post.findById({}) //return array
    } catch (e) {
        throw e;
    }
}

