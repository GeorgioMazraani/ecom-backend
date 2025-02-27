const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBConfig');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true 
  },
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true 
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'cart_items',
  timestamps: false
});

// Associations
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Cart, {
    foreignKey: 'cart_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  CartItem.belongsTo(models.Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = CartItem;
