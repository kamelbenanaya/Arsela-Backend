const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductShema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductShema);
