const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    active: {
        type: Boolean,
        required: [true, 'please provide bool board.active']
    },
    text_only: {
        type: Boolean,
        required: [true, 'please provide bool board.text_only']
    }
})



const Board = mongoose.model('Board', boardSchema);
module.exports = Board;