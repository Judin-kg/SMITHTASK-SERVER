const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    makingDuration:{type: String, require:true},
    category:{type: String, require:true},
    weight: { type: Number, required: true },
    mc: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports= Cart