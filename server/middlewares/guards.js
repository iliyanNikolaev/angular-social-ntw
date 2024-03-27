function hasUser(req, res, next) {
    if (!req.userData) {
        return res.status(404).json({
            errors: ['You must to be logged to access this page']
        });
    }
    next();
}
function isGuest(req, res, next) {
    if (req.userData) {
        return res.status(404).json({
            errors: ['You must to guest to access this page']
        });
    }
    next();
}

module.exports = {
    hasUser,
    isGuest
}