// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardStats,getUserGraph, getOrderGraph } = require("../controllers/dashboardController");

router.get("/stats", getDashboardStats);
router.get("/user-graph", getUserGraph);
router.get("/order-graph", getOrderGraph);
module.exports = router;
