const SubCategory = require('../model/subcategory.model');
const Category = require('../model/category.model');
const ExtraCategory = require('../model/extracategory.model');
const Product = require('../model/product.model');

module.exports.addSubCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const categories = await Category.find();
    res.render('subcategory/addSubCategory', { admin, categories });
};

module.exports.addSubCategory = async (req, res) => {
    try {
        await SubCategory.create({
            name: req.body.name,
            category: req.body.category
        });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewSubCategories');
};

module.exports.viewSubCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const subcategories = await SubCategory.find().populate('category');
    res.render('subcategory/viewSubCategories', { admin, subcategories });
};

module.exports.editSubCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const subcategory = await SubCategory.findById(req.params.id);
    const categories = await Category.find();
    res.render('subcategory/editSubCategory', { admin, subcategory, categories });
};

module.exports.updateSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            category: req.body.category
        });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewSubCategories');
};

module.exports.deleteSubCategory = async (req, res) => {
    const id = req.params.id;
    try {
        // remove products under this subcategory
        await Product.deleteMany({ subcategory: id });
        // remove extra categories under this subcategory
        await ExtraCategory.deleteMany({ subcategory: id });
        await SubCategory.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewSubCategories');
};
