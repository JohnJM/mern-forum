const mongoose = require('mongoose');
const boardService = require('../services/boardService');
const threadService = require('../services/threadService');
const multer = require('multer');

const Thread = require('../models/thread');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.createThread_post = async(req, res) => {
    // const {user_id, board} = req
    try {
        const {subject, content, image, user_id, board_id} = req.body;
        const createdThread = await Thread.create({
            subject,
            user_id,
            board_id: mongoose
                .Types
                .ObjectId(board_id),
            content,
            image: 'uploads/images/' + req.file.originalname
        })

        res
            .status(200)
            .json(createdThread);
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.OPAndPosts_get = async(req, res) => {
    try {
        const {thread_id} = req.params;

        const OP = await Thread.findById(thread_id);
        const Posts = await Post
            .find({
            thread_id: mongoose
                .Types
                .ObjectId(thread_id)
        })
            .sort({'createdAt': 1})
            .limit(80);
        res
            .status(200)
            .json({OP, Posts})

    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.createPost_post = async(req, res) => {

    try {
        const {thread_id, comment, user_id, options} = req.body;
        const createdPost = await Post.create({user_id, thread_id, comment, options});

        res
            .status(200)
            .json(createdPost);

    } catch (err) {
        console.log(err);
        throw Error('can\'t post create post...', err);
    }
}
