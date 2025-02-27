const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT token and check if the user is an admin.
 */
const verifyAdmin = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        if (!verified || verified.role !== "ADMIN") {
            return res.status(403).json({ message: "Access Denied: Admins only" });
        }

        req.admin = verified;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyAdmin;
