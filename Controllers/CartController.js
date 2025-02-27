const cartService = require("../Services/CartService");

/**
 * Creates a new cart session.
 */
const createCart = async (req, res) => {
    try {
        const { session_id } = req.body;
        const cart = await cartService.createCart(session_id);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Adds a product to the cart.
 */
const addToCart = async (req, res) => {
    try {
        const { cart_id, product_id, quantity } = req.body;
        const cartItem = await cartService.addToCart(cart_id, product_id, quantity);
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves cart items by cart ID.
 */
const getCartItems = async (req, res) => {
    try {
        const items = await cartService.getCartItems(req.params.id);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Clears all items from the cart.
 */
const clearCart = async (req, res) => {
    try {
        const cleared = await cartService.clearCart(req.params.id);
        if (!cleared) return res.status(404).json({ message: "Cart not found" });
        res.json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCart,
    addToCart,
    getCartItems,
    clearCart
};
