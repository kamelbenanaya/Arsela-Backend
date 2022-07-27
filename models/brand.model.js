const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let brandSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
