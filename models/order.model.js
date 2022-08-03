const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    statut : {
      type: String,
      enum: ["Holding", "Paid","Rejected"],
      default : "Holding"
    },
    user:  { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
