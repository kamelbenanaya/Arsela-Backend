const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("tokens", tokenSchema);
