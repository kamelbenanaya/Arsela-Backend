const express = require("express");
const router = express.Router();
const brand = require("../controllers/brand.controller");
const verifytoken =require("../Middleware/verifytoken");

const Validator = require("../Middleware/validator")

const validaterequest = Validator(true);

router.get("/",brand.getAllBrand);
router.get("/:idBrand",brand.getBrand);
router.post("/add",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin],brand.createBrand);
router.put("/update/:idBrand",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin],brand.updateBrand);
router.delete("/delete/:idBrand",[verifytoken.verifytoken,verifytoken.isAdmin],brand.deleteBrand);



module.exports = router;
