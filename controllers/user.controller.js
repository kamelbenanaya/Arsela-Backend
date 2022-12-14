const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");

module.exports = {
  getAllUsers: async function (req, res) {
    try {
      const {limit=4,page=1}=req.query
      const response = await userModel.find().populate("image").limit(limit*1).skip((page-1)*limit).exec();
      const count = await userModel.countDocuments();
      res.send({data : response,
      totalpages : Math.ceil(count / limit),
      currentPage : page,
      totalData: count
      });
    } catch (err) {
      res.send({message : "An error occured"});
    }
  },
  createUser: async function (req, res) {
    try {
      const user = await userModel.create(req.body);
      res.status(201).send({ message: "User Created", user });
    } catch (err) {
      res.status(400).send({message : "An error occured"});
    }
  },
  getUser : async function( req, res ){
    try {
      const _id = req.params.idUser;
      const response = await userModel.findById(_id);
      res.send(response);

    } catch (err){
      res.status(500).send({message: " internal server error"});
    }
  },
  updateUser: function (req,res){
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const _id = req.params.idUser;
    userModel.findByIdAndUpdate(_id, req.body,{new: true}).then (data=> {
      if (!data){
        res.status(404).send({
          message : "cannot update"
        });
        
      }else  res.send({ message : "user updated",data})
    }) .catch (err => {
      res.status(500).send({message: "error"})
    })
  },
  deleteUser: function(req, res) {
    const _id = req.params.idUser;
    userModel.findByIdAndDelete(_id).then(data => {
      if (!data){
        res.status(404).send({
          message : "cannot deleted"
        })
      }else res.send({ message : "user deleted",data})
    }) .catch (err => {
      res.status(500).send({ message : "error"})
    })
  },
};
