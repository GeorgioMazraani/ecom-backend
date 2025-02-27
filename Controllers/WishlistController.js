const wishlistService = require("../Services/WishlistService");

/**
 * Adds a product to the wishlist (for a given session).
 */
const addToWishlist = async (req, res) => {
    try {
        const { session_id, product_id } = req.body;
        const wishlistItem = await wishlistService.addToWishlist(session_id, product_id);
        res.status(201).json(wishlistItem);
    } catch (error) {
        // If we wanted to detect a "duplicate entry" error specifically, we could:
        // if (error.message.includes("already in the wishlist")) { ... }
        // But for now, just return the error message:
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves all wishlist items for a given session.
 */
const getWishlistItems = async (req, res) => {
    try {
        const { session_id } = req.params;
        const items = await wishlistService.getWishlistItems(session_id);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Removes a specific wishlist item by ID.
 */
const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const removed = await wishlistService.removeFromWishlist(id);
        if (!removed) return res.status(404).json({ message: "Wishlist item not found" });
        res.json({ message: "Wishlist item removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Clears the wishlist for a given session ID.
 */
const clearWishlist = async (req, res) => {
    try {
        const { session_id } = req.params;
        const cleared = await wishlistService.clearWishlist(session_id);
        if (!cleared) return res.status(404).json({ message: "No wishlist items found" });
        res.json({ message: "Wishlist cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addToWishlist,
    getWishlistItems,
    removeFromWishlist,
    clearWishlist
};
