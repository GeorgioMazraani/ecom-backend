const categoryService = require("../Services/CategoryService");

/**
 * Creates a new category with an image.
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null;
    const category = await categoryService.createCategory(name, imageUrl);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fetches all categories with product count.
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates a category by ID.
 */
const updateCategory = async (req, res) => {
  try {
    const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null;
    const updated = await categoryService.updateCategory(req.params.id, req.body.name, imageUrl);
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a category by ID.
 */
const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
