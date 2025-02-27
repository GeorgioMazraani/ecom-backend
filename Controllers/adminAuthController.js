const adminAuthService = require("../Services/adminAuthService");

/**
 * Handles admin login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const authResponse = await adminAuthService.loginAdmin(username, password);
        return res.status(200).json(authResponse);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { login };
