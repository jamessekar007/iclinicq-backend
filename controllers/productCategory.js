const  ProductCategory  = require('../models/ProductCategory.js'); // Adjust the path as necessary

const getProductsCategories = (async (req, res) => {
    try {
        //const users = await ProductCategory.findAll({});
        const productCategories = await  ProductCategory.findAll({
            attributes: ['id', 'category'],
          });
        res.json({data:productCategories});
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      }
})

module.exports = {
    getProductsCategories
}