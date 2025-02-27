// Services/WishlistService.js

const Wishlist = require("../Models/Wishlist");
const { UniqueConstraintError } = require("sequelize");

/**
 * Add a product to the wishlist for a given session.
 */
const addToWishlist = async (session_id, product_id) => {
    try {
        // If (session_id, product_id) is unique, this will throw
        // a UniqueConstraintError if there's a duplicate.
        return await Wishlist.create({ session_id, product_id });
    } catch (error) {
        console.error("Error adding item to wishlist:", error);

        // Optional: If you want to handle duplicates gracefully:
        if (error instanceof UniqueConstraintError) {
            throw new Error("Item is already in the wishlist");
        }

        throw new Error("Failed to add item to wishlist");
    }
};

/**
 * Retrieve all wishlist items for a given session.
 */
const getWishlistItems = async (session_id) => {
    try {
        return await Wishlist.findAll({ where: { session_id } });
    } catch (error) {
        console.error("Error fetching wishlist items:", error);
        throw new Error("Failed to retrieve wishlist items");
    }
};

/**
 * Remove a single item from the wishlist by item ID.
 */
const removeFromWishlist = async (wishlist_id) => {
    try {
        const deleted = await Wishlist.destroy({ where: { id: wishlist_id } });
        return deleted > 0;
    } catch (error) {
        console.error("Error removing wishlist item:", error);
        throw new Error("Failed to remove item from wishlist");
    }
};

/**
 * Clear all wishlist items for a given session.
 */
const clearWishlist = async (session_id) => {
    try {
        const cleared = await Wishlist.destroy({ where: { session_id } });
        return cleared > 0;
    } catch (error) {
        console.error("Error clearing wishlist:", error);
        throw new Error("Failed to clear wishlist");
    }
};

module.exports = {
    addToWishlist,
    getWishlistItems,
    removeFromWishlist,
    clearWishlist,
};
