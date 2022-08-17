const express = require("express");
const router = express.Router();
const category = require("../controllers/category.controller");
const verifytoken =require("../Middleware/verifytoken");
const Validator = require("../Middleware/validator")

const validaterequest = Validator(true);

router.get("/", category.getAllCategory);
router.get("/:idCat",category.getCategory);
router.post("/add",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin],category.createCategory);
router.put("/update/:idCat",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin],category.updateCategory);
router.delete("/delete/:idCat",[verifytoken.verifytoken,verifytoken.isAdmin],category.deleteCategory);

module.exports = router;
