const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    profilePic: { type: String, default: 'https://res.cloudinary.com/dwq3ysahj/image/upload/v1694182765/profile-pic_ekruoe.png'},
    posts: { type: [Types.ObjectId], default: [], ref: 'Post' },
    connections: { type: [Types.ObjectId], default: [], ref: 'User' }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;