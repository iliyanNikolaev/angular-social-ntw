const { verifyToken } = require("../services/userService");

function session() {
    return function (req, res, next) {
        const token = req.headers.token;
        if (token) {
            try {
                const userData = verifyToken(token);
                req.isAuthenticated = true;
                req.userData = userData;
            } catch (err) {
                return res.status(404).json({message: 'Invalid token!'});
            }
        }
        next();
    }
}

module.exports = session;