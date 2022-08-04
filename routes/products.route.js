const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const verifytoken = require("../Middleware/verifytoken");
const verify = require("../Middleware/verifySignUp");
const products = require("../controllers/products.controller");

const upload = require("../Middleware/uploadfile");


router.get("/", products.getAllProduct);
router.post(
  "/add",
  [
    verifytoken.verifytoken,
    verifytoken.isAdmin,
    upload.fields([{ name: "images" }]),
  ],
  products.createProduct
);
router.get("/:idProd", products.getProduct);
router.delete(
  "/delete/:idProd",
  [verifytoken.verifytoken, verifytoken.isAdmin],
  products.deleteProduct
);
router.put(
  "/update/:idProd",
  [verifytoken.verifytoken, verifytoken.isAdmin],
  products.updateProduct
);
router.post("/upload", upload.single("file"), products.uploadfile);

module.exports = router;
