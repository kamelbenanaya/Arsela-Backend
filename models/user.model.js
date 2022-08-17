const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userschema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    
    required: true,
  },
  country: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default : "user"
  },
  image: { type: Schema.Types.ObjectId, ref: "Files" }
});
module.exports = mongoose.model("User", userschema);
