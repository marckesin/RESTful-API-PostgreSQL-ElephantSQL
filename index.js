require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mountRoutes = require("./routes/index");

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mountRoutes(app);

app.listen(port);

module.exports = app;
