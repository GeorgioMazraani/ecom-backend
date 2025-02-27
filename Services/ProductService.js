const Product = require("../Models/Product");

/**
 * Create a new product.
 */
const createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};

/**
 * Retrieve all products.
 */
const getAllProducts = async () => {
  try {
    return await Product.findAll();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to retrieve products");
  }
};

/**
 * Retrieve a product by its ID.
 */
const getProductById = async (id) => {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    console.error("Error retrieving product:", error);
    throw new Error("Failed to retrieve product");
  }
};

/**
 * Update a product by its ID.
 */
const updateProduct = async (id, updatedFields) => {
  try {
    const [updated] = await Product.update(updatedFields, { where: { id } });
    return updated; // returns the number of rows updated (0 or 1)
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

/**
 * Delete a product by its ID.
 */
const deleteProduct = async (id) => {
  try {
    const deleted = await Product.destroy({ where: { id } });
    return deleted > 0; // returns true if a row was deleted
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
