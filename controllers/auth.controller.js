const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

module.exports = {
  signup: async function (req, res) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    const userSaved = await userModel.create(user);
    res.status(200).send({
      message: "user created",
      user: userSaved,
    });
    //  userModel.create(user)
  },
  signin: function (req, res) {
     userModel.findOne({
        email: req.body.email,
      })
      .exec(async(err, user) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        if (!user) {
          return res
            .status(404)
            .send({ message: "user not found with that Email" });
        }
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({ message: " password is invalid" });
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 86400,
        }
        );

        return res.status(200).send({
            user:{
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            },
            token,
        })
      });
  },
  
};
