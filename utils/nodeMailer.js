"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USERNAME, // generated ethereal user

    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail=(to, subject, text)=> {
  transporter.sendMail({
    from: process.env.MAIL_USERNAME, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });
}
