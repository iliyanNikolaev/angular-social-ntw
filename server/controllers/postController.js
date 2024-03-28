const { getLastPosts, getLastPostsByUserId, toggleLikeByPostId, createPost, editPostById, deletePostById, getPostById } = require('../services/postService');
const { hasUser } = require('../middlewares/guards');
const { errorParser } = require('../utils/errorParser');

const postController = require('express').Router();

postController.get('/', async (req, res) => {
    let skip = 0;
    if(req.query.skip && !isNaN(Number(req.query.skip))) {
        skip = Number(req.query.skip);
    }
    try {
        const posts = await getLastPosts(skip);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.get('/byUser/:userId', async (req, res) => {
    let skip = 0;
    if(req.query.skip && !isNaN(Number(req.query.skip))) {
        skip = Number(req.query.skip);
    }
    try {
        const posts = await getLastPostsByUserId(skip, req.params.userId);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.get('/details/:postId', async (req, res) => {
    try {
        const post = await getPostById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.post('/like/:id', hasUser, async (req, res) => {
    try {
        const post = await toggleLikeByPostId(req.params.id, req.userData._id);
        res.status(200).json(post);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.post('/create', hasUser, async (req, res) => {
    try {
        const reqId = req.userData._id
        createPostDto(req);
        const post = await createPost({ ...req.body, owner: reqId });
        res.status(200).json(post);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.put('/edit/:id', hasUser, async (req, res) => {
    try {
        const currentPost = await getPostById(req.params.id);
        if(currentPost.owner._id != req.userData._id) {
            throw new Error('Only owner can edit a post!');
        }
        editPostDto(req);
        const post = await editPostById(req.params.id, req.body);
        res.status(200).json(post);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.delete('/delete/:id', hasUser, async (req, res) => {
    try {
        const currentPost = await getPostById(req.params.id);
        if(currentPost.owner._id != req.userData._id) {
            throw new Error('Only owner can delete a post!');
        }
        const response = await deletePostById(req.params.id, req.userData._id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
module.exports = postController;
function createPostDto(req) {
    if(req.body.textContent == '' || req.body.textContent.length < 3 || req.body.textContent.length > 70){
        throw new Error('Post must have text content between 3 and 70 characters!')
    }
}
function editPostDto(req) {
    if(req.body.textContent) {
        if(req.body.textContent == '' || req.body.textContent.length < 3 || req.body.textContent.length > 70){
            throw new Error('Post must have text content between 3 and 70 characters!')
        }
    }
    if(req.body.picture){
        const pattern = /^https:\/\/res\.cloudinary\.com\//;
        if(!pattern.test(req.body.picture)){
            throw new Error('Invalid image');
        }
    }
}