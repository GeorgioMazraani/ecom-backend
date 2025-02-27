const express = require("express");
const adminAuthController = require("../Controllers/adminAuthController");
const adminController = require("../Controllers/AdminController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = express.Router();

// Admin Login Route
router.post("/login", adminAuthController.login); // Login admin and get JWT token

// Admin CRUD Operations (Protected with Admin Authentication)
router.post("/", adminController.createAdmin);
router.get("/", verifyAdmin, adminController.getAdminByUsername);

module.exports = router;
