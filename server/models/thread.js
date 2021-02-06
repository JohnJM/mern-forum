const mongoose = require('mongoose');

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const threadSchema = new Schema({
    subject: {
        type: String,
        unique: false,
        required: true
    },
    user_id: {
        type: ObjectId,
        required: [true, 'please provide user_id']
    },
    board_id: {
        type: ObjectId,
        required: [true, 'please provide board_id']
    },
    content: {
        type: String,
        required: [true, 'Please enter some content...']
    },
    img: {
        type: String,
        required: false
    }
}, {timestamps: true})



const Board = mongoose.model('Board', boardSchema);
module.exports = Board;