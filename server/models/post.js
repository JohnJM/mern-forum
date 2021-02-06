const mongoose = require('mongoose')
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    thread_id: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    postNumber: {
        type: Number,
        required: true
    },
    img: {type: String, required: false},
    repliesToId: {
        type: ObjectId,
        required: false
    },
    // OP: {
    //     type: Boolean,
    //     required: true
    // },
    // online: {
    //     type: Boolean,
    //     required: true
    // }

}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

