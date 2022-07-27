const mangoose = require("mongoose");
const schema = mangoose.schema;

let userschema = new schema({
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
    max: 8,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  image: { type: Schema.Types.ObjectId, ref: "Files" },
});
module.exports = mongoose.model("User", userschema);
