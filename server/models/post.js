const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    poster: {
        type: String,
        required: [true, 'no poster value']
    },
    subject: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    postNumber: {
        type: Number,
        required: true
    },
    repliesTo: {
        type: Number,
        required: false
    },
    OP: {
        type: Boolean,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

