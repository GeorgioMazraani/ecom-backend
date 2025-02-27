const express = require("express");
const orderController = require("../Controllers/OrderController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = express.Router();

// Create Order (Public - for users to place orders)
router.post("/", orderController.createOrder);

// Get All Orders (Admin Only)
router.get("/", verifyAdmin, orderController.getAllOrders);

// Update Order Status (Admin Only)
router.put("/:id/status", verifyAdmin, orderController.updateOrderStatus);

module.exports = router;
