const productService = require("../Services/ProductService");

/**
 * Creates a new product.
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id, gender, section } = req.body;
    const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null;

    const product = await productService.createProduct({
      name,
      description,
      price,
      stock,
      category_id,
      gender,
      section,
      image_url: imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id, gender, section } = req.body;
    const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null;

    const updated = await productService.updateProduct(req.params.id, {
      name,
      description,
      price,
      stock,
      category_id,
      gender,
      section,
      image_url: imageUrl,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Fetches all products.
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fetches a product by ID.
 */
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Deletes a product by ID.
 */
const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
