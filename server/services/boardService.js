const Board = require('../models/board');

module.exports.listBoards = async () => {
    try {
        return Board.find({});
    }
    catch (err){
        throw EvalError;
    }
}