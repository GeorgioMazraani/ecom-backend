const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBConfig');
const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

// Associations
OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  OrderItem.belongsTo(models.Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = OrderItem;
