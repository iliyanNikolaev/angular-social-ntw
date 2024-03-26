function hasUser(req, res, next) {
    if(!req.userData){
        return res.render('404', {
            title: '404 Page',
            errors: ['You must to be logged to access this page']
        });
    }
    next();
}
function isGuest(req, res, next) {
    if(req.userData){
        return res.render('404', {
            title: '404 Page',
            errors: ['You must to be guest to access this page']
        });
    }
    next();
}

module.exports = {
    hasUser,
    isGuest
}