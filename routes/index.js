var express = require("express");
var app = express();
var productsRouter = require("./products.route");

app.use("/products", productsRouter);

module.exports = app;
