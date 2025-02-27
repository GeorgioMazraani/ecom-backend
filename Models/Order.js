const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBConfig');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  customer_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  customer_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Pending'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: false
});

// Associations
Order.associate = (models) => {
  Order.hasMany(models.OrderItem, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = Order;
