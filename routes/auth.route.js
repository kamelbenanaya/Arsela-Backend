const express = require("express");
const router = express.Router();
const verify= require("../Middleware/verifySignUp");
const autho = require("../controllers/auth.controller");
const upload = require("../Middleware/uploadfile");
const verifyToken = require("../Middleware/verifytoken");

router.post("/signup",[verify.checkDuplicateEmail,upload.single("file")],autho.signup);
router.post("/signin",autho.signin);
router.post("/forget",autho.forgetPassword);
router.post("/password-reset/:userId/:token",autho.setPassword);
router.post("/password-reset/:userId/",[verifyToken.verifytoken,verifyToken.isAdmin],autho.resetPassword);


module.exports = router;
