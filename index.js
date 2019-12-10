const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;
const apiRouter = require("./routes/api");

app.use('/', apiRouter);

app.listen(PORT, function() {
    console.log(`TFT proxy listening on port %s`, PORT);
});