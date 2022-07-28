var express = require("express");
var app = express();



var productsRouter = require("./products.route");
var authRouter= require ("./auth.route");
var userRouter= require("./user.route");

app.use("/user",userRouter);
app.use("/auth",authRouter);
app.use("/products", productsRouter);

module.exports = app;
