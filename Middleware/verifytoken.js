const  jwt = require("jsonwebtoken");
const bcrypt= require ("bcryptjs");
const userModel = require("../models/user.model");


module.exports={
verifytoken : function (req,res,next){
jwt.verify(
    req.headers["x-access-token"],
    process.env.SECRET_KEY,(err,decoded)=>{
        if (err){
            return res.status(401).send({message:"Unauthorized!"});
        }
        req.userId= decoded.id;
        next();
    }
)

},
isAdmin: function (req,res,next){
    userModel.findById(req.userId).exec((err, user) =>{
        if (err){
            res.status(500).send({message : err});
            return;
        }
       if(user.role!=="admin") res.status(403).send({message : "require admin role !"});
       else
       next() 
       
    })
}
}