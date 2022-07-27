const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cartSchema = new Schema(
  {
    Order:  { type: Schema.Types.ObjectId, ref: "Order" },
    Product:  { type: Schema.Types.ObjectId, ref: "Product" },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
      },
    total: {
        type: Number,
        default : 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
