const express = require("express");
const router = express.Router();

var products = require("../controllers/products.controller");

router.get("/", products.getAllProduct);
router.post("/add", products.createProduct);
router.get("/find/:id", products.find);
router.delete("/delete/:id", products.delete);
router.put("/update/:id", products.update);

module.exports = router;
