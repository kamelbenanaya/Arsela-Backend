const express = require("express");
const router = express.Router();
const brand = require("../controllers/brand.controller");
const verifytoken =require("../Middleware/verifytoken");

router.get("/",brand.getAllBrand);
router.get("/:idBrand",brand.getBrand);
router.post("/add",[verifytoken.verifytoken,verifytoken.isAdmin],brand.createBrand);
router.put("/update/:idBrand",[verifytoken.verifytoken,verifytoken.isAdmin],brand.updateBrand);
router.delete("/delete/:idBrand",[verifytoken.verifytoken,verifytoken.isAdmin],brand.deleteBrand);



module.exports = router;
