const express = require("express");
const multer = require("multer");
const path = require("path");
const categoryController = require("../Controllers/CategoryController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Serve uploaded images
router.use("/uploads", express.static("uploads"));

// Create Category (Admin Only) with Image Upload
router.post("/", verifyAdmin, upload.single("image"), categoryController.createCategory);

// Get All Categories (Public)
router.get("/", categoryController.getAllCategories);

// Update Category (Admin Only) with Image Upload
router.put("/:id", verifyAdmin, upload.single("image"), categoryController.updateCategory);

// Delete Category (Admin Only)
router.delete("/:id", verifyAdmin, categoryController.deleteCategory);

module.exports = router;
