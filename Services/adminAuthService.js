const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");
require("dotenv").config();

/**
 * Authenticates an admin using username and password.
 * @param {string} username - Admin's username.
 * @param {string} password - Admin's password.
 * @returns {Promise<Object>} Returns admin details & JWT token.
 */
const loginAdmin = async (username, password) => {
    try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, admin.password_hash);
        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT Token
        const token = generateToken(admin);

        return { 
            token, 
            admin: { id: admin.id, username: admin.username } 
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Generates a JWT token for admin authentication.
 * @param {Object} admin - The admin object.
 * @returns {string} JWT token.
 */
const generateToken = (admin) => {
    const expiresIn = process.env.JWT_EXPIRES_IN || "1h"; 

    return jwt.sign(
        { id: admin.id, username: admin.username, role: "ADMIN" },
        process.env.JWT_SECRET,
        { expiresIn }  
    );
};


module.exports = {
    loginAdmin
};
