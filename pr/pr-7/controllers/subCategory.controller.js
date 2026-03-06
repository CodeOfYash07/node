const Category = require("../model/category.model");
const SubCategory = require("../model/subcategory.model");
const fs = require('fs');

module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('subcategory/addSubCategoryPage', { categories });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/addSubCategoryPage');
    }
}

module.exports.addSubCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.subcategory_image = req.file.path;
        }

        const newSubCategory = await SubCategory.create(req.body);

        if (newSubCategory) {
            req.flash('success', 'SubCategory Inserted Successfully..');
        } else {
            req.flash('error', 'SubCategory Insertion Failed..');
        }
        return res.redirect('/subcategory/addSubCategoryPage');

    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/addSubCategoryPage');
    }
}

module.exports.viewSubCategoryPage = async (req, res) => {
    try {
        const allSubCategory = await SubCategory.find().populate('category_id', "category_name category_image");

        return res.render("subcategory/viewSubCategoryPage", { allSubCategory });

    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/addSubCategoryPage');
    }
}

module.exports.deleteSubCategory = async (req, res) => {
    try {
        const deleted = await SubCategory.findByIdAndDelete(req.query.Id);

        if (deleted && deleted.subcategory_image) {
            fs.unlink(deleted.subcategory_image, () => { });
        }
        req.flash('success', `${deleted.subcategory_name} Deleted Successfully..`);
        return res.redirect('/subcategory/viewSubCategoryPage');
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/viewSubCategoryPage');
    }
}

module.exports.editSubCategoryPage = async (req, res) => {
    try {
        const subcategory = await SubCategory.findById(req.params.subcategoryId).populate('category_id');
        const categories = await Category.find();
        return res.render('subcategory/editSubCategoryPage', { subcategory, categories });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/viewSubCategoryPage');
    }
}

module.exports.updateSubCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.subcategory_image = req.file.path;
            const old = await SubCategory.findByIdAndUpdate(req.params.subcategoryId, req.body);
            if (old) fs.unlink(old.subcategory_image, () => { });
            req.flash('success', `${req.body.subcategory_name} Updated Successfully..`);
        } else {
            req.flash('success', `${req.body.subcategory_name} Updated Successfully..`);
            await SubCategory.findByIdAndUpdate(req.params.subcategoryId, req.body);
        }

        return res.redirect('/subcategory/viewSubCategoryPage');
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subcategory/viewSubCategoryPage');
    }
}