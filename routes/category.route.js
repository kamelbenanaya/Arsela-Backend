const express = require("express");
const router = express.Router();
const category = require("../controllers/category.controller");
const verifytoken =require("../Middleware/verifytoken");


router.get("/", category.getAllCategory);
router.get("/:idCat",category.getCategory);
router.post("/add",[verifytoken.verifytoken,verifytoken.isAdmin],category.createCategory);
router.put("/update/:idCat",[verifytoken.verifytoken,verifytoken.isAdmin],category.updateCategory);
router.delete("/delete/:idCat",[verifytoken.verifytoken,verifytoken.isAdmin],category.deleteCategory);

module.exports = router;
