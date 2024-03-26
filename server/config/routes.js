const userController = require("../controllers/userController");

function routesConf(app) {
    app.use('/users', userController);
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'This page not exist'});
    });
}

module.exports = routesConf;