var express = require("express");
var app = express();



var productsRouter = require("./products.route");
var authRouter= require ("./auth.route");
var userRouter= require("./user.route");
var categoryRouter = require("./category.route");
var brandRouter = require("./brand.route");


app.use("/users",userRouter);
app.use("/auth",authRouter);
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/brands",brandRouter);

module.exports = app;
