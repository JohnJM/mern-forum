const boardService = require('../services/boardService');
const Board = require('../models/board');

module.exports.boards_get = async (req, res) => {
    
    boardService.listBoards().then(boards => {
        res.status(203).json({boards});
    }).catch(err => {
        res.status(400).json({err})
    })
}