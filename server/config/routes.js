const authController = require("../controllers/authController");

function routesConf(app) {
    app.use('/auth', authController);
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'This page not exist'});
    });
}

module.exports = routesConf;