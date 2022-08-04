const express = require("express");
const router = express.Router();
const verify= require("../Middleware/verifySignUp");
const autho = require("../controllers/auth.controller");
const upload = require("../Middleware/uploadfile");

router.post("/signup",[verify.checkDuplicateEmail,upload.single("file")],autho.signup);
router.post("/signin",autho.signin);
module.exports = router;
