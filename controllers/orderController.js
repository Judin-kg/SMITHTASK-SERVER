const Order = require("../models/Order");



// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, username, email,productId,productName, weight, mc } = req.body;
//       if (!userId) {
//       return res.status(400).json({ success: false, message: "userId is required" });
//     }
//     console.log(req.body, "req.bodyyyyyy");
//     const order = new Order({
//       productId,
//       productName,
//       weight,
//       mc,
//       // userId: req.user.id,    // auto from middleware
//       // username: req.user.username,
//       // email: req.user.email
//        userId,
//       username,
//       email,
//     });
 
 
    
    
//     console.log(order, "order detailsssssss");
    

//     await order.save();
//     res.status(201).json({ success: true, order });
//   } catch (err) {
//     console.error("Error creating order:", err);
//     res.status(500).json({ success: false, message: "Failed to place order" });
//   }
// };


// controllers/orderController.js





// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, username, email,productId,productName, weight, mc,quantity  } = req.body;
       if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // 🔎 Check if order already exists for same user & product
    const existingOrder = await Order.findOne({ email, productId });
    if (existingOrder) {
      return res.status(400).json({ success: false, message: "⚠️ Order already exists for this product." });
    }
   
    // ✅ Create new order
    const newOrder = new Order({ userId, username, email,productId,productName, weight, mc,quantity  });
    await newOrder.save();

    res.status(201).json({ success: true, message: "✅ Order placed successfully!", order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "❌ Server error" });
  }
};

// ✅ Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ✅ Get Orders by User
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// ✅ Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

// DELETE Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
