const { editCommentById, deleteCommentById, createComment } = require('../services/commentService');
const { errorParser } = require('../utils/errorParser');

const commentController = require('express').Router();

commentController.post('/create', async (req, res) => {
    try {
        // createPostDto
        const comment = await createComment(req.body);
        res.status(200).json(comment);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
commentController.put('/edit/:id', async (req, res) => {
    try {
        // editCommentDto
        const comment = await editCommentById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
commentController.delete('/delete/:id', async (req, res) => {
    try {
        const response = await deleteCommentById(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});
module.exports = commentController;