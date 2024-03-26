const express = require('express');
const dbConnect = require('./config/db');
const app = express();
app.get('/', (req, res) => {
    res.send('hello');
});
kick();
async function kick() {
    await dbConnect();
    app.listen(3000, () => console.log('rest api started on url: http://localhost:3000'));
}
