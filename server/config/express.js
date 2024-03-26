const express = require('express');

const cors = require('cors');

function expressConf(app) {
    app.use(cors());
    app.use(express.json());
}

module.exports = expressConf;