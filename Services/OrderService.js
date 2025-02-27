// Services/OrderService.js

const Order = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");

/**
 * Create a new Order with its OrderItems.
 */
const createOrder = async (orderData, items) => {
    try {
        const order = await Order.create(orderData);
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));
        await OrderItem.bulkCreate(orderItems);
        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
};

/**
 * Retrieve all orders (including their items).
 */
const getAllOrders = async () => {
    try {
        return await Order.findAll({
            include: [OrderItem], // or { model: OrderItem } if you prefer an object
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to retrieve orders");
    }
};

/**
 * Update the status of a specific Order.
 */
const updateOrderStatus = async (id, status) => {
    try {
        const [updated] = await Order.update({ status }, { where: { id } });
        return updated; // 0 or 1
    } catch (error) {
        console.error("Error updating order status:", error);
        throw new Error("Failed to update order status");
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus,
};
