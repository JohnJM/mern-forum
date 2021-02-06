const Post = require('../models/post');


// A list of threads and their preview replies from a specified index page. Index pages start at 1. The maximum number of pages may vary depending on the board.
module.exports.getAllPostsInAThread = async (thread_id) => {
    try {
        return Post.findById({}) //return array
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

