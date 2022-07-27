const express = require("express");
const router = express.Router();

var products = require("../controllers/products.controller");

router.get("/", products.all);
router.post("/add", products.add);
router.get("/find/:id", products.find);
router.delete("/delete/:id", products.delete);
router.put("/update/:id", products.update);

module.exports = router;
