const userModel=require("../models/user.model");
module.exports={
    getAllUsers: async function  (req, res){
        try {
            const response = await userModel.find();
            res.send(response);
          } catch (err) {
            res.send(err);
          }
    }
}