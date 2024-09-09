const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const Products = sequelize.define('products', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_category: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
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

module.exports = Products;