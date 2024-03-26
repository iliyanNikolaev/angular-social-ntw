const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({

});

const Post = model('Post', userSchema);

module.exports = Post;