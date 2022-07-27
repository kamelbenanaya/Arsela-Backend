const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let filesSchema = new Schema(
  {
    src: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Files", filesSchema);
