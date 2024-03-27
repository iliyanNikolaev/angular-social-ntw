const Post = require('../models/Post');

async function getLastPosts() {
    return ["last 5 posts with populated comments and owner or error"]
}

async function getLastPostsByUserId(id) {
    return ["last 5 posts or error"]
}
async function toggleLikeByPostId(id) {
    return ["ok or error"]
}

async function createPost(postData) {
    return ["created post or error"]
}

async function editPostById(id) {
    return ["edited post or error"]
}

async function deletePostById(id) {
    return ["ok or error"]
}

module.exports = {
    getLastPosts,
    getLastPostsByUserId,
    toggleLikeByPostId,
    createPost,
    editPostById,
    deletePostById
}