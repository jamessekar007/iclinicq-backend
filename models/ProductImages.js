const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const  Products  = require('../models/Products.js');

const ProductImages = sequelize.define('product_images', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING
  }
  // Other attributes
}, {
  // Other model options
});

Products.hasMany(ProductImages, { foreignKey: 'product_id' });
ProductImages.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = ProductImages;