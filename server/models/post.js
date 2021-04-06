const mongoose = require('mongoose')
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: false
    },
    thread_id: {
        type: ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    options: {
        type: String,
        required: false
    },
    img: {type: String, required: false}
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

