const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBConfig');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'admins',
  timestamps: false
});

module.exports = Admin;
