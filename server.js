const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./Config/DBConfig"); // Database connection
const events = require("events");
const path = require("path");
// Load environment variables
dotenv.config();

// Increase EventEmitter limit to prevent memory leaks
events.EventEmitter.defaultMaxListeners = 20;

// Import Models
const Admin = require("./Models/Admin");
const Category = require("./Models/Category");
const Product = require("./Models/Product");
const Order = require("./Models/Order");
const OrderItem = require("./Models/OrderItem");
const Cart = require("./Models/Cart");
const CartItem = require("./Models/CartItem");
const Wishlist = require("./Models/Wishlist"); 

// Initialize Relationships inside each model
const models = {
  Admin,
  Category,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Wishlist, 
};

// Establish Relationships 
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body Parsing Middleware
// (Your code snippet showed a custom approach: skipping JSON parsing on GET/DELETE)
app.use((req, res, next) => {
  if (req.method === "DELETE" || req.method === "GET") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 E-commerce API is running!" });
});

// Import Route Modules
const adminRoutes = require("./Routes/adminRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/productRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes"); 

app.use("/api/admins", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes); 

// 404 Error Handling for Unknown Routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Synchronize database and start the server
const PORT = process.env.PORT || 4000;

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

