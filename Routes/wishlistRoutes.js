const express = require("express");
const router = express.Router();
const wishlistController = require("../Controllers/WishlistController");

// Add a product to the wishlist
// (Optionally, add your own authentication middleware here if needed, e.g. verifyUser)
router.post("/", wishlistController.addToWishlist);

// Get wishlist items by session_id
router.get("/:session_id", wishlistController.getWishlistItems);

// Remove a single wishlist item by the wishlist record ID
router.delete("/:id", wishlistController.removeFromWishlist);

// Clear all wishlist items for a given session_id
router.delete("/session/:session_id", wishlistController.clearWishlist);

module.exports = router;
