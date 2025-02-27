const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBConfig');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  session_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'carts',
  timestamps: false
});

// Associations
Cart.associate = (models) => {
  Cart.hasMany(models.CartItem, {
    foreignKey: 'cart_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = Cart;
