const { register, login, getAllUsers, toggleConnectionById, deleteProfile, getUserById } = require('../services/userService');
const { errorParser } = require('../utils/errorParser');

const userController = require('express').Router();

// handlers that are not included in the authentication logic
userController.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

userController.get('/details/:id', async (req, res) => {
    try {
        const response = await getUserById(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

userController.delete('/delete/:id', async (req, res) => {
    try {
        const response = await deleteProfile(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

userController.post('/connect/:id', async (req, res) => {
    try {
        const response = await toggleConnectionById(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

// authentication
userController.post('/register', async (req, res) => {
    try {
        registerDto(req);
        const user = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
        res.status(200).json(user);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

userController.post('/login', async (req, res) => {
    try {
        loginDto(req);
        const user = await login(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

module.exports = userController;

function registerDto(req) {
    if(req.body.email == '' 
        || req.body.password == ''
        || req.body.firstName == ''
        || req.body.lastName == '') {
        throw new Error('all fields are required');
    }
    if(req.body.email.length < 10) {
        throw new Error('The email should be at least 10 characters long');
    }
    if(req.body.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }
    if(req.body.firstName.length < 2 || req.body.firstName.length > 20) {
        throw new Error('The firstName should be between 2 and 20 characters long');
    }
    if(req.body.lastName.length < 2 || req.body.lastName.length > 20) {
        throw new Error('The lastName should be between 2 and 20 characters long');
    }
    if(req.body.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }
    if(req.body.password != req.body.repeat) {
        throw new Error('The repeat password should be equal to the password');
    }
}
function loginDto(req) {
    if(req.body.email == '' || req.body.password == '') {
        throw new Error('all fields are required');
    }
    if(req.body.email.length < 10) {
        throw new Error('The email should be at least 10 characters long');
    }
    if(req.body.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }
}