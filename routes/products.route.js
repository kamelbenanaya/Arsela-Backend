const express = require("express");
const router = express.Router();
const verifytoken =require("../Middleware/verifytoken");
const verify= require("../Middleware/verifySignUp");
const products = require("../controllers/products.controller");

router.get("/", products.getAllProduct);
router.post("/add", [verifytoken.verifytoken,verifytoken.isAdmin],products.createProduct);
router.get("/:idProd", products.getProduct);
router.delete("/delete/:idProd",[verifytoken.verifytoken,verifytoken.isAdmin], products.deleteProduct);
router.put("/update/:idProd",[verifytoken.verifytoken,verifytoken.isAdmin], products.updateProduct);

module.exports = router;