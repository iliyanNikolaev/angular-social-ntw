const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    textContent: { type: String, required: true },
    picture: { type: String },
    likes: { type: [Types.ObjectId], default: [], ref: 'User'},
    comments: { type: [Types.ObjectId], default: [], ref: 'Comment'},
    owner: { type: Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;