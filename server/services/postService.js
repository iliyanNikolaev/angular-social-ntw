const Post = require('../models/Post');
const User = require('../models/User');

async function getLastPosts(skip) {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(3)
        .populate({
            path: 'likes',
            select: '_id firstName lastName profilePic'
        })
        .populate({
            path: 'comments',
            select: 'textContent owner',
            populate: {
                path: 'owner',
                select: '_id firstName lastName profilePic'
            }
        })
        .populate({
            path: 'owner',
            select: '_id firstName lastName profilePic' // Избери само определените полета на owner
        });
    return posts;
}

async function getLastPostsByUserId(skip, userId) {
    const posts = await Post.find({ owner: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(3)
        .populate({
            path: 'likes',
            select: '_id firstName lastName profilePic'
        })
        .populate({
            path: 'comments',
            select: 'textContent owner',
            populate: {
                path: 'owner',
                select: '_id firstName lastName profilePic'
            }
        })
        .populate({
            path: 'owner',
            select: '_id firstName lastName profilePic'
        });
    return posts;
}

async function toggleLikeByPostId(id, likerId) {
    const currentPost = await Post.findById(id);
    let response = [];
    if (currentPost.likes.includes(likerId)) {
        response = await Post.updateOne(
            { _id: id },
            { $pull: { likes: likerId } });
    } else {
        response = await Post.updateOne(
            { _id: id },
            { $push: { likes: likerId } });
    }
    return response;
}

async function createPost(postData) {
    const post = await Post.create(postData);
    await User.updateOne(
        { _id: postData.owner },
        { $push: { posts: post._id } });
    return post;
}

async function editPostById(id, postData) {
    if (postData.picture && postData.picture != '') {
        await Post.findByIdAndUpdate(id, postData);
    } else {
        await Post.findByIdAndUpdate(id, {
            textContent: postData.textContent
        });
    }
    const edited = await Post.findById(id);
    return edited;
}

async function deletePostById(id, ownerId) {
    const response = await Post.findByIdAndDelete(id);
    await User.updateOne(
        { _id: ownerId },
        { $pull: { posts: id } });
    return response;
}

async function getPostById(id) {
    const post = await Post.findById(id)
        .populate({
            path: 'owner',
            select: '_id firstName lastName profilePic'
        })
        .populate({
            path: 'likes',
            select: '_id firstName lastName profilePic'
        })
        .populate({
            path: 'comments',
            select: 'textContent owner',
            populate: {
                path: 'owner',
                select: '_id firstName lastName profilePic'
            }
        });
    return post;
}

module.exports = {
    getLastPosts,
    getLastPostsByUserId,
    toggleLikeByPostId,
    createPost,
    editPostById,
    deletePostById,
    getPostById
}