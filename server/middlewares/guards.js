function hasUser(req, res, next) {
    if (!req.userData) {
        return res.status(404).json({
            errors: ['You must to be logged to perform this action']
        });
    }
    next();
}
function isGuest(req, res, next) {
    if (req.userData) {
        return res.status(404).json({
            errors: ['You must to guest to perform this action']
        });
    }
    next();
}

module.exports = {
    hasUser,
    isGuest
}