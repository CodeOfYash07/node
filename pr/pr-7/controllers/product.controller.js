const Product = require('../model/product.model');
const Category = require('../model/categories.model');
const SubCategory = require('../model/subCategories.model');
const ExtraCategory = require('../model/extraCategories.model');
const fs = require('fs');

module.exports.addProductPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();
        return res.render('product/addProductPage', { admin, currentPath: req.originalUrl.split('?')[0], allCategory, allSubCategory, allExtraCategory });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/addProductPage');
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        if (req.file) req.body.product_img = req.file.path;
        const newProduct = await Product.create(req.body);
        if (newProduct) req.flash('success', 'Product added successfully !!'); else req.flash('error', 'Failed to add Product !!');
        return res.redirect('/product/addProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/addProductPage');
    }
}

module.exports.viewProductPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allProduct = await Product.find().populate('category_id').populate('subcategory_id').populate('extraCategory_id');
        return res.render('product/viewProductPage', { admin, currentPath: req.originalUrl.split('?')[0], allProduct });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (deleted) {
            if (deleted.product_img) { try { fs.unlinkSync(deleted.product_img); } catch (e) { /* ignore */ } }
            req.flash('success', `${deleted.product_name} Product Deleted Successfully..`);
        } else {
            req.flash('error', 'Product Deletion Failed..');
        }
        return res.redirect('/product/viewProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.editProductPage = async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id).populate('category_id').populate('subcategory_id').populate('extraCategory_id');
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();
        return res.render('product/editProductPage', { productData, allCategory, allSubCategory, allExtraCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        if (req.file) req.body.product_img = req.file.path;
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (updated) {
            if (req.file && updated.product_img) { try { fs.unlinkSync(updated.product_img); } catch (e) { /* ignore */ } }
            req.flash('success', `${req.body.product_name || updated.product_name} Product Updated Successfully..`);
        } else {
            req.flash('error', 'Product Updation Failed..');
        }
        return res.redirect('/product/viewProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}
