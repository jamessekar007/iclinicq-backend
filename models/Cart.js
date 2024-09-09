const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const User = require('./User');
const Products = require('./Products');

const Cart = sequelize.define('cart', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: User, // 'Users' would also work
        key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Products, // 'Users' would also work
        key: 'id'
    }
  },
  amount: {
    type: DataTypes.FLOAT
  },
  qty: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Other attributes
}, {
  // Other model options
});



Products.hasMany(Cart, { foreignKey: 'product_id' });
Cart.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = Cart;