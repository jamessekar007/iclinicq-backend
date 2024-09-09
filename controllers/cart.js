const  Cart  = require('../models/Cart.js'); // Adjust the path as necessary
const  Products  = require('../models/Products.js'); // Adjust the path as necessary
const createCart = (async (req, res) => {
    try {
        console.log('req.userId',req.userId);
        console.log('req.product_id',req.product_id);
        console.log('req.amount',req.amount);
        console.log('req.qty',req.qty);

        const cart = await Cart.create({
            user_id: req.userId,
            product_id: req.body.product_id,
            amount: req.body.amount,
            qty: req.body.qty,
        });
        res.status(201).json({ message: 'Cart Added sussusfully',data:cart });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error Create Cart' });
      }
})

const getCart = (async (req, res) => {
    try {
        const cart = await  Cart.findAll({
            where: {
                user_id: req.userId
            },
            include: [
                {
                    model: Products, 
                    as: 'product'
                }
            ],
            attributes: ['id', 'user_id','product_id','amount','qty'],
          });
        res.json({data:cart});
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching Cart' });
      }
})

const updateCart = (async (req, res) => {
    try {
        let cartId = req.params.id;
        var cart = await  Cart.update({ qty: req.body.qty,amount: req.body.amount}, {
                                    where: {
                                        id: cartId
                                    }
          })
          res.status(200).json({ message: 'Cart Updated sussusfully',data:cart });

      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching Cart' });
      }
})

const deleteCart = (async (req, res) => {
    try {
        let cartId = req.params.id;
        // Delete a record with a specific condition
        Cart.destroy({
            where: {
                id: cartId,
                user_id: req.userId
            }
        })
        .then(result => {
            res.status(204).json({ message: 'Cart Deleted successfully'});
        })
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching Cart' });
      }
})

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart
}