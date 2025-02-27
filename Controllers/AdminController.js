const adminService = require("../Services/AdminService");

/**
 * Handles admin creation.
 */
const createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newAdmin = await adminService.createAdmin(username, password);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Fetches an admin by username from the token.
 */
const getAdminByUsername = async (req, res) => {
  try {
    const { username } = req.admin; // Extract from the token

    if (!username) {
      return res.status(400).json({ message: "Username missing from token" });
    }

    const admin = await adminService.getAdminByUsername(username);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    console.error("Error retrieving admin:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createAdmin,
    getAdminByUsername
};
