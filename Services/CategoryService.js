const Category = require("../Models/Category");
const Product = require("../Models/Product"); // Assuming this model exists

/**
 * Create a new category.
 */
const createCategory = async (name, imageUrl) => {
  try {
    return await Category.create({ name, image_url: imageUrl });
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

/**
 * Retrieve all categories with product counts.
 */
const getAllCategories = async () => {
  try {
    return await Category.findAll({
      include: [{
        model: Product,
        attributes: [],
      }],
      attributes: {
        include: [
          [Category.sequelize.fn("COUNT", Category.sequelize.col("Products.id")), "product_count"],
        ],
      },
      group: ["Category.id"],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to retrieve categories");
  }
};

/**
 * Update a category by its ID.
 */
const updateCategory = async (id, name, imageUrl) => {
  try {
    const updateData = { name };
    if (imageUrl) updateData.image_url = imageUrl;

    const [updated] = await Category.update(updateData, { where: { id } });
    return updated; // 0 or 1
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};

/**
 * Delete a category by its ID.
 */
const deleteCategory = async (id) => {
  try {
    const deleted = await Category.destroy({ where: { id } });
    return deleted > 0;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
