const { register, login, getAllUsers, toggleConnectionById, deleteProfile, getUserById, editUser } = require('../services/userService');
const { hasUser } = require('../middlewares/guards');
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

userController.put('/edit/:id', hasUser, async (req, res) => {
    if(req.userData._id == req.params.id) {
        try {
            editProfileDto(req)
            const response = await editUser(req.params.id, {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profilePic: req.body.profilePic
            });
            res.status(200).json(response);
        } catch (err) {
            const errors = errorParser(err);
            res.status(400).json({ errors });
        }   
    } else {
        res.status(400).json({ errors: ['You can edit only your own profile!'] });
    }
});

userController.delete('/delete/:id', hasUser, async (req, res) => {
    if(req.userData._id == req.params.id) {
        try {
            const response = await deleteProfile(req.params.id);
            res.status(200).json(response);
        } catch (err) {
            const errors = errorParser(err);
            res.status(400).json({ errors });
        }
    } else {
        res.status(400).json({ errors: ['You can delete only your own profile!'] });
    }
});

userController.post('/connect/:id', hasUser, async (req, res) => {
    try {
        const response = await toggleConnectionById(req.params.id, req.userData._id);
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
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(req.body.email)){
        throw new Error('The email should be in valid format');
    }
    if(req.body.email.length < 10 || req.body.email.length > 30) {
        throw new Error('The email should be between 10 and 30 characters long');
    }
    if(req.body.password.length < 4 || req.body.password.length > 30) {
        throw new Error('The password should be be between 4 and 30 characters long');
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
function editProfileDto(req) {
    if(req.body.email){
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!pattern.test(req.body.email)){
            throw new Error('The email should be in valid format');
        }
        if(req.body.email.length < 10 || req.body.email.length > 30) {
            throw new Error('The email should be between 10 and 30 characters long');
        }
    }
    if(req.body.firstName){
        if(req.body.firstName.length < 2 || req.body.firstName.length > 20) {
            throw new Error('The firstName should be between 2 and 20 characters long');
        }
    }
    if(req.body.lastName){
        if(req.body.lastName.length < 2 || req.body.lastName.length > 20) {
            throw new Error('The lastName should be between 2 and 20 characters long');
        }
    }
}