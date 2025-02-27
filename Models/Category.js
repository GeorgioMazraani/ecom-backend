const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBConfig");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  },
}, {
  tableName: "categories",
  timestamps: false,
});

// Associations
Category.associate = (models) => {
  Category.hasMany(models.Product, {
    foreignKey: "category_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

module.exports = Category;
