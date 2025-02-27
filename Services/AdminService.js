const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create a new Admin
const createAdmin = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newAdmin = await Admin.create({
            username,
            password_hash: hashedPassword
        });
        return newAdmin;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error("Failed to create admin");
    }
};

// Get Admin by Username
const getAdminByUsername = async (username) => {
    try {
        return await Admin.findOne({ where: { username } });
    } catch (error) {
        console.error("Error retrieving admin:", error);
        throw new Error("Failed to retrieve admin");
    }
};

module.exports = {
    createAdmin,
    getAdminByUsername
};
