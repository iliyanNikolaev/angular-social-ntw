const express = require('express');
const dbConnect = require('./config/db');
const expressConf = require('./config/express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: "hello" });
});

start();

async function start() {
    await dbConnect();
    expressConf(app);
    app.listen(3000, () => console.log('rest api started on url: http://localhost:3000'));
}
