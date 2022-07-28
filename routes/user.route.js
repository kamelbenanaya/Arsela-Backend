const express = require("express");
const router = express.Router();
const user= require("../controllers/user.controller");
const verifytoken =require("../Middleware/verifytoken");

router.get("/",[verifytoken.verifytoken,verifytoken.isAdmin],user.getAllUsers);

module.exports = router;
