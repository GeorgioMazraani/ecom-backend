const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBConfig");
const Category = require('./Category');
const CartItem = require('./CartItem');
const OrderItem = require('./OrderItem');
const Wishlist = require('./Wishlist');

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  category_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Men", "Women", "Kids"),
    allowNull: true, 
  },
  section: {
    type: DataTypes.ENUM("None", "BestSeller", "OnSale", "NewArrivals"),
    allowNull: false,
    defaultValue: "None",
  }
}, {
  tableName: "products",
  timestamps: false,
});

// Associations
Product.associate = () => {
  // Belongs to Category
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
  });

  // Has many CartItems
  Product.hasMany(CartItem, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  // Has many OrderItems
  Product.hasMany(OrderItem, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  // Has many Wishlist entries
  Product.hasMany(Wishlist, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
};

module.exports = Product;
