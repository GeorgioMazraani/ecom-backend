const express = require("express");
const cartController = require("../Controllers/CartController");

const router = express.Router();

// Create Cart Session (Authenticated Users Only)
router.post("/",  cartController.createCart);

// Add Product to Cart
router.post("/add",  cartController.addToCart);

// Get Cart Items
router.get("/:id",  cartController.getCartItems);

// Clear Cart
router.delete("/:id", cartController.clearCart);

module.exports = router;
