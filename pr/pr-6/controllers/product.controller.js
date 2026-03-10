const Product = require('../model/product.model');
const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const ExtraCategory = require('../model/extracategory.model');

module.exports.addProductPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const categories = await Category.find();
    const subcategories = await SubCategory.find();
    const extras = await ExtraCategory.find();
    res.render('product/addProduct', { admin, categories, subcategories, extras });
};

module.exports.addProduct = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            category: req.body.category || null,
            subcategory: req.body.subcategory || null,
            extraCategory: req.body.extraCategory || null,
            price: req.body.price,
            description: req.body.description
        };
        if (req.files && req.files.length) {
            data.images = req.files.map(f => f.path);
        }
        await Product.create(data);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewProducts');
};

module.exports.viewProductPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const products = await Product.find()
        .populate('category')
        .populate('subcategory')
        .populate('extraCategory');

    res.render('product/viewProducts', { admin, products });
};

module.exports.editProductPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    const subcategories = await SubCategory.find({ category: product.category });
    const extras = await ExtraCategory.find({ subcategory: product.subcategory });
    res.render('product/editProduct', { admin, product, categories, subcategories, extras });
};

module.exports.updateProduct = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            category: req.body.category || null,
            subcategory: req.body.subcategory || null,
            extraCategory: req.body.extraCategory || null,
            price: req.body.price,
            description: req.body.description
        };
        if (req.files && req.files.length) {
            data.images = req.files.map(f => f.path);
        }
        await Product.findByIdAndUpdate(req.params.id, data);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewProducts');
};

module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewProducts');
};
