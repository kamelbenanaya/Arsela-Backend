const userModel = require("../models/user.model")


module.exports={
    checkDuplicateEmail : async function (req,res,next) {
    const user = await  userModel.findOne({email : req.body.email})
    console.log("user", user);
    if (user) res.send("User exist !")
    else next()
}}