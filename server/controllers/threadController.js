const mongoose = require('mongoose');
const boardService = require('../services/boardService');
const threadService = require('../services/threadService');
const multer = require('multer');

const Thread = require('../models/thread');



module.exports.createThread_post = async(req, res) => {
    // const {user_id, board} = req
    try {
        const {subject, content, image, user_id, board_id} = req.body;

        // console.log(req.file);
    console.log('hit here.', board_id);

        const createdThread = await Thread.create({subject, user_id, board_id: mongoose.Types.ObjectId(board_id), content, image: 'uploads/images/' + req.file.originalname})

        console.log('created thread -> ', createdThread);

        res.status(200).json(createdThread);
    } catch (err) {
        throw err;
    }
}