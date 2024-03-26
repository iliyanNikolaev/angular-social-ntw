const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({

});

const Comment = model('Comment', userSchema);

module.exports = Comment;