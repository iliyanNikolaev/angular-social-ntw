const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/errorParser');

const authController = require('express').Router();

authController.post('/register', async (req, res) => {
    try {
        registerDto(req);
        const user = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
        res.status(200).json(user);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

authController.post('/login', async (req, res) => {
    try {
        loginDto(req);
        const user = await login(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (err) {
        const errors = errorParser(err);
        res.status(400).json({ errors });
    }
});

module.exports = authController;

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