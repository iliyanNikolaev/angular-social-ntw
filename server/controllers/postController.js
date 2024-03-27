const { getLastPosts, getLastPostsByUserId, toggleLikeByPostId, createPost, editPostById, deletePostById } = require('../services/postService');
const { errorParser } = require('../utils/errorParser');

const postController = require('express').Router();

postController.get('/', async (req, res) => {
    try {
        const posts = await getLastPosts();
        res.status(200).json(users);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.get('/byUser/:userId', async (req, res) => {
    try {
        const posts = await getLastPostsByUserId(req.params.userId);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.post('/like/:id', async (req, res) => {
    try {
        const posts = await toggleLikeByPostId(req.params.id);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.post('/create', async (req, res) => {
    try {
        // createPostDto
        const posts = await createPost(req.body);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.put('/edit/:id', async (req, res) => {
    try {
        // createPostDto
        const posts = await editPostById(req.params.id);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
postController.delete('/delete/:id', async (req, res) => {
    try {
        // createPostDto
        const posts = await deletePostById(req.params.id);
        res.status(200).json(posts);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
module.exports = postController;