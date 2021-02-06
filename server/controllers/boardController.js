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

    const { boardId, page } = req.params;

    console.log('boardController index_get hit. id and page ->', boardId, page);



    threadService.getThreadsAndPreviewPostsFromIndex(boardId, page).then(content => {
        res.status(200).json({content});
    }).catch(err => {
        console.log('error on boardController - index_get', err);
        res.status(400);
    })

}