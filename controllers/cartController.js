const Cart = require("../models/Cart");

// ➕ Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { makingDuration,userId, productId, productName, weight, mc, quantity, username, email,category} = req.body;
     console.log(req.body,"reqqqqqqqqq");
     
     
    // Check if item already exists in cart for this user
    let existingItem = await Cart.findOne({ userId, productId});

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "✅ Quantity updated in cart", cart: existingItem });
    }
   
    // const newCartItem = new Cart({
    //   userId,
    //   username,
    //   email,
    //   productId,
    //   productName,
    //   category,
    //   makingDuration,
    //   weight,
    //   mc,
    //   quantity,
    //   });
      
    const newCartItem = new Cart(req.body);
      
      
    console.log(newCartItem,"carttttttttttttt");
    
    await newCartItem.save();
    res.status(201).json({ message: "✅ Added to cart", cart: newCartItem });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ message: "❌ Failed to add to cart" });
  }
};


// 📥 Get User's Cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.find({ userId });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch cart" });
  }
};

// ❌ Remove item from cart
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { id } = req.params; // cart item id
//     await Cart.findByIdAndDelete(id);
//     res.json({ message: "🗑 Item removed from cart" });
//   } catch (err) {
//     res.status(500).json({ message: "❌ Failed to remove item" });
//   }
// };

// ✅ Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deleted = await Cart.findOneAndDelete({ userId, productId });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// 🗑 Clear user cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });
    res.json({ message: "🧹 Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to clear cart" });
  }
};

