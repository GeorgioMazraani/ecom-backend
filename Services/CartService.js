// Services/CartService.js

const Cart = require("../Models/Cart");
const CartItem = require("../Models/CartItem");

/**
 * Create a new Cart session.
 */
const createCart = async (session_id) => {
    try {
        return await Cart.create({ session_id });
    } catch (error) {
        console.error("Error creating cart:", error);
        throw new Error("Failed to create cart");
    }
};

/**
 * Add a product to the cart.
 */
const addToCart = async (cart_id, product_id, quantity) => {
    try {
        return await CartItem.create({ cart_id, product_id, quantity });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new Error("Failed to add item to cart");
    }
};

/**
 * Get all items from a given cart.
 */
const getCartItems = async (cart_id) => {
    try {
        return await CartItem.findAll({ where: { cart_id } });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Failed to retrieve cart items");
    }
};

/**
 * Clear all items from a given cart.
 */
const clearCart = async (cart_id) => {
    try {
        const cleared = await CartItem.destroy({ where: { cart_id } });
        return cleared > 0;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw new Error("Failed to clear cart");
    }
};

module.exports = {
    createCart,
    addToCart,
    getCartItems,
    clearCart,
};
