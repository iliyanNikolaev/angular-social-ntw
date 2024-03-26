const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
    textContent: { type: String, required: true },
    postId: { type: String, required: true },
    owner: { type: Types.ObjectId, required: true, ref: 'User' }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;