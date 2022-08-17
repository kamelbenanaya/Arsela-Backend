const express = require("express");
const router = express.Router();
const user= require("../controllers/user.controller");
const verifytoken =require("../Middleware/verifytoken");
const verify= require("../Middleware/verifySignUp");
const upload = require("../Middleware/uploadfile");
const Validator = require("../Middleware/validator")

const validaterequest = Validator(true);

router.get("/",[verifytoken.verifytoken,verifytoken.isAdmin],user.getAllUsers);
router.post("/add",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin,verify.checkDuplicateEmail, upload.single("file")],user.createUser);
router.get("/:idUser",[verifytoken.verifytoken,verifytoken.isAdmin],user.getUser);
router.post("/update/:idUser",[validaterequest,verifytoken.verifytoken,verifytoken.isAdmin],user.updateUser);
router.delete("/delete/:idUser",[verifytoken.verifytoken,verifytoken.isAdmin],user.deleteUser);


module.exports = router;
