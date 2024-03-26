const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'ab89abf0-198b-473d-9a8a-8bc05af58e0d';
const User = require('../models/User');

async function register(email, password, firstName, lastName) {
    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error('email is taken');
    }
    const hashedPass = await bcrypt.hash(password, 5);
    const user = await User.create({
        email,
        password: hashedPass,
        firstName,
        lastName
    });
    const token = createSession(user);
    return {
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        _id: user._id
    };
}
async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('wrong email or pass');
    }
    const hasMatch = await bcrypt.compare(password, user.password);
    if (!hasMatch) {
        throw new Error('wrong email or pass');
    }
    const token = createSession(user);
    return {
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        _id: user._id
    };
}
function verifyToken(token) {
    return jsonwebtoken.verify(token, jwtSecret);
}
function createSession({ _id, email, profilePicture, firstName, lastName }) {
    const payload = {
        _id,
        email,
        profilePicture,
        firstName,
        lastName
    }
    const token = jsonwebtoken.sign(payload, jwtSecret);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
}