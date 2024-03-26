const express = require('express');
const dbConnect = require('./config/db');
const expressConf = require('./config/express');
const routesConf = require('./config/routes');
const app = express();

start();

async function start() {
    await dbConnect();
    expressConf(app);
    routesConf(app);
    app.listen(3000, () => console.log('rest api started on url: http://localhost:3000'));
}
