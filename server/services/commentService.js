const { Types }= require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

async function createComment(commentData) {
    if (!Types.ObjectId.isValid(commentData.postId)) {
        throw new Error('Invalid postId');
    }
    const comment = await Comment.create(commentData);
    await Post.updateOne(
        { _id: commentData.postId },
        { $push: { comments: comment._id } });
    const res = await Comment.findById(comment._id).populate({ path: 'owner', select: '_id firstName lastName profilePic'})
    return res;
}

async function deleteCommentById(id, reqUserId) {
    const currentComment = await Comment.findById(id);
    if(currentComment.owner != reqUserId){
        throw new Error('Only owner can delete comment');
    }
    const response = await Comment.findByIdAndDelete(id);
    await Post.updateOne(
        { _id: currentComment.postId },
        { $pull: { comments: id } });
    return response;
}

module.exports = {
    createComment,
    deleteCommentById
}