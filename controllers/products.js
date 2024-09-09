const  Products  = require('../models/Products.js');
const  ProductsImages  = require('../models/ProductImages.js'); 
const CommonController = require('../controllers/common.js');


const createProducts = (async (req, res) => {
  try {
    CommonController.upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      else{
        const product = await Products.create({
          name: req.body.name,
          product_category: req.body.product_category,
          description: req.body.description,
          amount: req.body.amount,
          qty: req.body.qty,
      });
      if(req.file){
        product.image = req.file.filename;
        const ProductsImagesData = await ProductsImages.create({
          product_id: product.id,
          image: req.file.filename
      });
      }

    res.status(201).json({ message: 'Product created successfully',data:product });
      }
    });
     
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
})

const getProducts = (async (req, res) => {
    try {
        let productId = req.params.id;
        if(productId){
          var products = await  Products.findAll({
            where: {
              id: productId,
              status:0
          },
            attributes: ['id', 'name','description','amount','qty'],
          });
        }else{
          var products = await  Products.findAll({
            where: {
              status:0
          },
          include: [
            {
                model: ProductsImages, // Include the child table (Post)
                as: 'product_images'  // Optionally define an alias
            }
        ],
            attributes: ['id', 'name','description','amount','qty'],
          });
        }
        
        res.json({data:products});
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      }
})


const updateProducts = (async (req, res) => {
  try {
    CommonController.upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      else{

      let productId = req.params.id;
      var product = await  Products.update({ name: req.body.name,
                                product_category: req.body.product_category,
                                description: req.body.description,
                                amount: req.body.amount,
                                qty: req.body.qty}, {
                                  where: {
                                      id: productId
                                  }
        })

    
      
     const ProductsImagesData = await ProductsImages.create({
        product_id: productId,
        image: req.file.filename
    });
   
    res.status(200).json({ message: 'Product Updated successfully',data:product });
      }
    });
     
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
})


const deleteProducts = (async (req, res) => {
  try {
    let productId = req.params.id;
    var product = await  Products.update({ status: 1}, {
                                where: {
                                    id: productId
                                }
      })
      res.status(204).json({ message: 'Product Deleted successfully',data:product });
     
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
})

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}