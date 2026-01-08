const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    weight: { type: Number, required: true },
    mc: { type: Number, required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }, // ✅ quantity field
    status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Completed", "Cancelled"] }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
// const Manager = mongoose.model("Manager", adminSchema);
module.exports = Order;