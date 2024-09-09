const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const ProductCategory = sequelize.define('product_categories', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.INTEGER,
  },
  // Other attributes
}, {
  // Other model options
});

module.exports = ProductCategory;