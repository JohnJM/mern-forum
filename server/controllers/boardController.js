const boardService = require('../services/boardService');
const threadService = require('../services/threadService');

const Board = require('../models/board');

module.exports.boards_get = async (req, res) => {
    
    boardService.listBoards().then(boards => {
        res.status(203).json({boards});
    }).catch(err => {
        res.status(400).json({err})
    })
}


module.exports.index_get = async (req, res) => {

    const { board, page } = req.params;

    console.log( 'HERERERRRRRRRRRRRRRRRRRRRRRRRRR',  req.params);

    console.log('boardController index_get hit. id and page ->', board, page);

    threadService.getThreadsFromIndex(board, page).then(threads => {
        res.status(200).json(threads);
    }).catch(err => {
        console.log('error on boardController - index_get', err);
        res.status(400);
    })

}
