const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBConfig");

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  session_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  added_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "wishlists",
  timestamps: false,
});

// Associations
Wishlist.associate = (models) => {
  Wishlist.belongsTo(models.Product, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Wishlist;
