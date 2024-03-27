const Comment = require('../models/Comment');

async function createComment(commentData) {
    return ["created comment or error"]
}

async function editCommentById(id) {
    return ["edited comment or error"]
}

async function deleteCommentById(id) {
    return ["deleted comment or error"]
}

module.exports = {
    createComment,
    editCommentById,
    deleteCommentById
}