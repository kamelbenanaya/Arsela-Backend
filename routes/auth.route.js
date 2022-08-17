const express = require("express");
const router = express.Router();
const validate = require("express-validator"); //
const verify= require("../Middleware/verifySignUp");
const autho = require("../controllers/auth.controller");
const upload = require("../Middleware/uploadfile");
const verifyToken = require("../Middleware/verifytoken");
const Validator = require("../Middleware/validator")

const validaterequest = Validator(true);


router.post("/signup",[validaterequest,verify.checkDuplicateEmail,upload.single("file")],autho.signup);
router.post("/signin",validaterequest,autho.signin);
router.post("/forget",validaterequest,autho.forgetPassword);
router.post("/password-reset/:userId/:token",validaterequest,autho.setPassword);
router.post("/passwordreset/:userId/",[validaterequest,verifyToken.verifytoken,verifyToken.isAdmin],autho.resetPassword);


module.exports = router;
