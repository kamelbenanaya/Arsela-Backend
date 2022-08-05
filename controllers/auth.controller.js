const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const FilesModel = require("../models/files.model");
const Mailing = require("../utils/nodeMailer");
const tokenModel = require("../models/tokenModel");

module.exports = {
  signup: async function (req, res) {
    const fileInfo = await FilesModel.create(req.file);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      image: fileInfo?._id,
    };

    const userSaved = await userModel.create(user);
    res.status(200).send({
      message: "user created",
      user: userSaved,
    });
  },
  signin: function (req, res) {
    userModel
      .findOne({
        email: req.body.email,
      })
      .exec(async (err, user) => {
        if (err) {
          return res.status(500).send({ message: "internal server error" });
        }
        if (!user) {
          return res
            .status(404)
            .send({ message: "user not found with that Email" });
        }
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user?.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({ message: " password is invalid" });
        }
        const expiresIn = 86400;
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn,
        });

        return res.status(200).send({
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          },
          token,
          expiresIn,
        });
      });
  },
  forgetPassword: async function (req, res) {
    const to = req.body.email; // email to sent
    userModel
      .findOne({
        email: req.body.email,
      })
      .exec(async (err, user) => {
        if (err) {
          return res.status(500).send({ message: "internal server error" });
        }
        if (!user) {
          return res
            .status(404)
            .send({ message: "user not found with that Email" });
        } else {
          const expiresIn = 60;
          const token = await jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn,
            }
          );
          await tokenModel.create({
            userId: user._id,
            token,
          });
          const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token}`;
          const sender = Mailing.sendEmail(to, "reset password", link);

          res.status(200).send({
            message: " password reset link sent to your email account",
            sender,
          });
        }
      });
  },
  setPassword: async function (req, res, next) {
    try {
      const _id = req.params.userId;
      const user = await userModel.findById(_id);
      if (!user) {
        return res
          .status(404)
          .send({ message: "user not found with that Email" });
      }
      let token = await tokenModel.findOne({ userId: user._id });
      if (!token) res.send({ message: "link not valid" });
      else {
        jwt.verify(
          token.token,
          process.env.SECRET_KEY,
          async (err, decoded) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized!" });
            } else {
              user.password = bcrypt.hashSync(req.body.password, 8);
              const userSaved = await user.save();
              if (userSaved) {
                await tokenModel.findByIdAndDelete(token._id);
              }
              res.send({
                message: "password reset success",
                Newpassword: user.password,
              });
            }
          }
        );
      }
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  },
  resetPassword: async function (req, res, next) {
    try {
      const _id = req.params.userId;
      const user = await userModel.findById(_id);
      if (!user) {
        return res
          .status(404)
          .send({ message: "user not found with that Email" });
      }
      user.password = bcrypt.hashSync(req.body.password, 8);
      const userSaved = await user.save();
      res.send({
        message: "password reset success",
        Newpassword: user.password,
      });
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  },
};
