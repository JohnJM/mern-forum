const mongoose = require('mongoose');
const boardService = require('../services/boardService');
const threadService = require('../services/threadService');
const multer = require('multer');

const Thread = require('../models/thread');
const Post = require('../models/post');



module.exports.createThread_post = async(req, res) => {
    // const {user_id, board} = req
    try {
        const {subject, content, image, user_id, board_id} = req.body;
        const createdThread = await Thread.create({subject, user_id, board_id: mongoose.Types.ObjectId(board_id), content, image: 'uploads/images/' + req.file.originalname})

        console.log('created thread -> ', createdThread);

        res.status(200).json(createdThread);
    } catch (err) {
        throw err;
    }
}


module.exports.OPAndPosts_get = async(req, res) => {
    try {
        const { thread_id } = req.params;

        const OP = await Thread.findById( thread_id );
        const Posts = await Post.find({ thread_id: mongoose.Types.ObjectId(thread_id)});
        res.status(200).json({OP, Posts})

    } catch (err) {
        throw Error('can\'t get OPAndPosts', err);
    }
}
