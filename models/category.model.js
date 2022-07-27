const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categorySchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
