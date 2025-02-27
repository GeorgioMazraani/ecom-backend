const orderService = require("../Services/OrderService");

/**
 * Creates a new order.
 */
const createOrder = async (req, res) => {
    try {
        const { orderData, items } = req.body;
        const order = await orderService.createOrder(orderData, items);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Fetches all orders.
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Updates the status of an order.
 */
const updateOrderStatus = async (req, res) => {
    try {
        const updated = await orderService.updateOrderStatus(
            req.params.id,
            req.body.status
        );
        if (!updated) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus
};
