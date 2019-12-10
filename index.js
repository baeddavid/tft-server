"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const requestify = require("requestify");
const moment = require("moment");
const env = require("dotenv");

const PORT = process.env.PORT || 3002;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function() {
    console.log(`TFT proxy listening on port %s`, PORT);
});