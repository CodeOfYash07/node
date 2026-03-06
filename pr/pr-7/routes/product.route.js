const express = require('express');
const upload = require('../middleware/multer.middleware');
const { addProductPage, addProduct, viewProductPage, deleteProduct, editProductPage, editProduct } = require('../controller/product.controller');

const productRoutes = express.Router();

productRoutes.get('/addProductPage', addProductPage);
productRoutes.post('/addProduct', upload.single('product_img'), addProduct);
productRoutes.get('/viewProductPage', viewProductPage);
productRoutes.get('/deleteProduct/:id', deleteProduct);
productRoutes.get('/editProduct/:id', editProductPage);
productRoutes.post('/editProduct/:id', upload.single('product_img'), editProduct);

module.exports = productRoutes;
