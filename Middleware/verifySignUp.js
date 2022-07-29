const userModel = require("../models/user.model")


module.exports={
    checkDuplicateEmail : async function (req,res,next) {
    const user = await  userModel.findOne({email : req.body.email})
    if (user) res.status(200).send({message: "User exist !"})
    else next()
}}