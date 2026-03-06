const Category = require('../model/categories.model');
const SubCategory = require('../model/subCategories.model');
const ExtraCategory = require('../model/extraCategories.model');

module.exports.addExtraCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        return res.render("extraCategory/addExtraCategoryPage", { admin, currentPath: req.originalUrl.split('?')[0], allCategory, allSubCategory });
    } catch (error) {
        console.log("Error : ", error);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}

module.exports.viewExtraCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allExtraCategory = await ExtraCategory.find().populate('category_id').populate('subcategory_id');
        return res.render('extracategory/viewExtracategoryPage', { admin, currentPath: req.originalUrl.split('?')[0], allExtraCategory });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    }
}

module.exports.addExtraCategory = async (req, res) => {
    try {
        const newExtraCategory = await ExtraCategory.create(req.body);

        if (newExtraCategory) {
            req.flash('success', 'Extra Category added successfully !!');
        } else {
            req.flash('error', 'Failed to add Extra Category !!');
        }

        return res.redirect('/extraCategory/addExtraCategoryPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/extraCategory/addExtraCategoryPage');
    }
}

module.exports.deleteExtraCategory = async (req, res) => {
    try {
        const deleted = await ExtraCategory.findByIdAndDelete(req.params.id);
        if (deleted) {
            req.flash('success', `${deleted.extraCategory_name} Extra Category Deleted Successfully..`);
        } else {
            req.flash('error', 'Extra Category Deletion Failed..');
        }
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    }
}

module.exports.editExtraCategoryPage = async (req, res) => {
    try {
        const extraCategoryData = await ExtraCategory.findById(req.params.id).populate('category_id').populate('subcategory_id');
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        return res.render('extracategory/editExtracategoryPage', { extraCategoryData, allCategory, allSubCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    }
}

module.exports.editExtraCategory = async (req, res) => {
    try {
        const updated = await ExtraCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updated) {
            req.flash('success', `${updated.extraCategory_name} Extra Category Updated Successfully..`);
        } else {
            req.flash('error', 'Extra Category Updation Failed..');
        }
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/extraCategory/viewExtraCategoryPage');
    }
}
