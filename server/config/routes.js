const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

function routesConf(app) {
    app.use('/users', userController);
    app.use('/posts', postController);
    app.use('/comments', commentController);
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'This path not exist'});
    });
}

module.exports = routesConf;