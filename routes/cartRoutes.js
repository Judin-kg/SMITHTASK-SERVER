const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add to cart
router.post("/", cartController.addToCart);

// Get user's cart
router.get("/:userId", cartController.getCart);

// // Remove single item
// router.delete("/:id", cartController.removeFromCart);

// Remove item
router.delete("/:userId/:productId",cartController.removeFromCart);

// Clear all items for user
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
