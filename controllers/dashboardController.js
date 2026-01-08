// controllers/dashboardController.js
const User = require("../models/User");
const Order = require("../models/Order");

// 📊 Get total users and orders
exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({
      success: true,
      data: { userCount, orderCount },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserGraph = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📊 Get orders created per month
exports.getOrderGraph = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};