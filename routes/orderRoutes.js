const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

// POST /api/orders - create new order
router.post("/", createOrder);

// GET /api/orders - get all orders (Admin)
router.get("/", getAllOrders);

// GET /api/orders/user/:userId - get orders for specific user
router.get("/user/:userId", getOrdersByUser);

// PUT /api/orders/:id - update order status
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
