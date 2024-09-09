var express = require('express');
const cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const router = express.Router();

const SECRET_KEY = '4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c';

const Products = require('./controllers/products.js');
const ProductCategory = require('./controllers/productCategory.js')
const User = require('./controllers/users.js')
const Cart = require('./controllers/cart.js')
const authMiddleware = require('./middleware/authMiddleware.js')

router.get('/', function (_req, res) {
  res.send('Hello World!');
});

router.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

// Admin Routes for products CRUD
router.post('/admin/products',authMiddleware.verifyToken,Products.createProducts);
router.get('/admin/products/:id?',authMiddleware.verifyToken,Products.getProducts);
router.put('/admin/products/:id',authMiddleware.verifyToken,Products.updateProducts);
router.delete('/admin/products/:id',authMiddleware.verifyToken,Products.deleteProducts);

router.get('/productsCategory',ProductCategory.getProductsCategories);

//User Route
router.post('/users/signup',User.signup);
router.post('/users/login',User.login);
router.get('/users/products/:id?',Products.getProducts);

//User Route for Cart functionality
router.post('/users/cart',authMiddleware.verifyToken,Cart.createCart);
router.get('/users/cart',authMiddleware.verifyToken,Cart.getCart);
router.put('/users/cart/:id',authMiddleware.verifyToken,Cart.updateCart);
router.delete('/users/cart/:id',authMiddleware.verifyToken,Cart.deleteCart);

//User Route for Checkout functionality
router.get('/users/checkout',authMiddleware.verifyToken,Cart.getCart);

app.use('/api/v1', router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;