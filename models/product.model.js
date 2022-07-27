const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pricePromotion: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image:  [{ type: Schema.Types.ObjectId, ref: "Files" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
