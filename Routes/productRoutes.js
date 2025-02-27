const express = require("express");
const multer = require("multer");
const path = require("path");
const productController = require("../Controllers/ProductController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder name where your images will be saved
  },
  filename: (req, file, cb) => {
    // Unique filename, e.g. 1677520449234.jpg
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve uploaded images at /uploads
router.use("/uploads", express.static("uploads"));

/**
 * Create Product (Admin Only)
 * - Includes image upload via upload.single('image')
 */
router.post("/", verifyAdmin, upload.single("image"), productController.createProduct);

/**
 * Get All Products (Public)
 */
router.get("/", productController.getAllProducts);

/**
 * Get Product by ID (Public)
 */
router.get("/:id", productController.getProductById);

/**
 * Update Product (Admin Only)
 * - Includes image upload via upload.single('image')
 */
router.put("/:id", verifyAdmin, upload.single("image"), productController.updateProduct);

/**
 * Delete Product (Admin Only)
 */
router.delete("/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;
