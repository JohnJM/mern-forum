const boardService = require('../services/boardService');
const threadService = require('../services/threadService');

const Thread = require('../models/Thread');


module.exports.createThread_post = async (req, res) => {
    // const {user_id, board} = req
    console.log('create threadcontroller hit. ', req);
} 