const express = require("express");
const router = express.Router();
const verify= require("../Middleware/verifySignUp");
const autho = require("../controllers/auth.controller");


router.post("/signup",verify.checkDuplicateEmail,autho.signup);
router.post("/signin",autho.signin);
module.exports = router;
