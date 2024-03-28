const { deleteCommentById, createComment } = require('../services/commentService');
const { hasUser } = require('../middlewares/guards');
const { errorParser } = require('../utils/errorParser');

const commentController = require('express').Router();

commentController.post('/create', hasUser, async (req, res) => {
    try {
        createCommentDto(req);
        const comment = await createComment({...req.body, owner: req.userData._id});
        res.status(200).json(comment);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

commentController.delete('/delete/:id', hasUser, async (req, res) => {
    try {
        const response = await deleteCommentById(req.params.id, req.userData._id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

module.exports = commentController;

function createCommentDto(req) {
    if(req.body.textContent == '' || req.body.postId == '') {
        throw new Error('fields cannot be empty string');
    }   
}