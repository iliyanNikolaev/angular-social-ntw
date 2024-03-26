const express = require('express');

const cors = require('cors');
const session = require('../middlewares/session');
const bodyTrim = require('../middlewares/bodyTrim');

function expressConf(app) {
    app.use(cors());
    app.use(express.json());
    app.use(session());
    app.use(bodyTrim());
}

module.exports = expressConf;