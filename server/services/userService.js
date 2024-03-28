const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'ab89abf0-198b-473d-9a8a-8bc05af58e0d';
const User = require('../models/User');
// auth
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

// others
async function getAllUsers() {
    const users = await User.find({})
        .select(['_id', 'firstName', 'lastName', 'profilePic'])
    return users;
}

async function getUserById(id) {
    const user = await User.findById(id)
        .select(['_id', 'firstName', 'lastName', 'profilePic', 'posts', 'connections'])
        .populate({
            path: 'posts',
            options: { sort: { createdAt: -1 }, limit: 3 },
            populate: [
                {
                    path: 'likes',
                    select: '_id firstName lastName profilePic'
                },
                {
                    path: 'comments',
                    select: 'textContent owner',
                    populate: {
                        path: 'owner',
                        select: '_id firstName lastName profilePic'
                    }
                }
            ]
        })
        .populate({
            path: 'connections',
            select: '_id firstName lastName profilePic'
        })
    return user;
}

async function toggleConnectionById(targetUserId, reqId) {
    const reqUser = await User.findById(reqId);
    let response1 = [];
    let response2 = [];
    if (reqUser.connections.includes(targetUserId)) {
        response1 = await User.updateOne(
            { _id: targetUserId },
            { $pull: { connections: reqId } });

        response2 = await User.updateOne(
            { _id: reqId },
            { $pull: { connections: targetUserId } });
    } else {
        response1 = await User.updateOne(
            { _id: targetUserId },
            { $push: { connections: reqId } });

        response2 = await User.updateOne(
            { _id: reqId },
            { $push: { connections: targetUserId } });
    }

    return [response1, response2];
}

async function deleteProfile(id) {
    const response = await User.findByIdAndDelete(id);
    return response;
}

async function editUser(id, userData) {
    if (userData.profilePic != '') {
        await User.findByIdAndUpdate(id, userData);
    } else {
        await User.findByIdAndUpdate(id, {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        });
    }
    const edited = await getUserById(id);
    return edited;
}

module.exports = {
    register,
    login,
    verifyToken,
    getAllUsers,
    toggleConnectionById,
    deleteProfile,
    getUserById,
    editUser
}