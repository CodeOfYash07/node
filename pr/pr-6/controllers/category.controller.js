const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const ExtraCategory = require('../model/extracategory.model');
const Product = require('../model/product.model');

// render add category page
module.exports.addCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    res.render('category/addCategory', { admin });
};

// create category
module.exports.addCategory = async (req, res) => {
    try {
        await Category.create({ name: req.body.name });
        return res.redirect('/viewCategories');
    } catch (err) {
        console.error(err);
        return res.redirect('/addCategoryPage');
    }
};

// list all categories
module.exports.viewCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const categories = await Category.find();
    res.render('category/viewCategories', { admin, categories });
};

// render edit page
module.exports.editCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');
    const category = await Category.findById(req.params.id);
    if (!category) return res.redirect('/viewCategories');
    res.render('category/editCategory', { admin, category });
};

// update category
module.exports.updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewCategories');
};

// delete with cascade
module.exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        // remove products belonging to this category
        await Product.deleteMany({ category: id });
        // remove extra categories under category
        await ExtraCategory.deleteMany({ category: id });
        // remove subcategories under category (and their extras/products in other controllers but handle here too)
        const subs = await SubCategory.find({ category: id });
        const subIds = subs.map(s => s._id);
        await ExtraCategory.deleteMany({ subcategory: { $in: subIds } });
        await Product.deleteMany({ subcategory: { $in: subIds } });
        await SubCategory.deleteMany({ category: id });
        // finally remove category itself
        await Category.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
    }
    return res.redirect('/viewCategories');
};
