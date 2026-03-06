const Category = require('../model/category.model');
const fs = require('fs').promises;
const path = require('path');

// Validation helpers
const validateCategoryData = (data) => {
    const errors = [];
    
    if (!data.category_name || data.category_name.trim() === '') {
        errors.push('Category name is required');
    }
    if (data.category_name && data.category_name.length > 100) {
        errors.push('Category name must be less than 100 characters');
    }
    if (data.description && data.description.length > 500) {
        errors.push('Description must be less than 500 characters');
    }
    
    return errors;
};

// Helper to delete file safely
const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            await fs.unlink(filePath);
        }
    } catch (err) {
        console.log("File deletion failed:", err);
    }
};

// Add Category Page
module.exports.addCategoryPage = async (req, res) => {
    try {
        // template file is named addCategoryPage.ejs
        return res.render('category/addCategoryPage');
    } catch (err) {
        console.log("❌ Add Category Page Error:", err);
        req.flash('error', 'Failed to load add category page');
        return res.redirect('/dashboard');
    }
};

// Insert Category
module.exports.insertCategory = async (req, res) => {
    try {
        // Validate input
        const validationErrors = validateCategoryData(req.body);
        if (validationErrors.length > 0) {
            req.flash('error', validationErrors.join(', '));
            return res.redirect('/category/addCategoryPage');
        }

        // Validate file upload
        if (!req.file) {
            req.flash('error', 'Category image is required');
            return res.redirect('/category/addCategoryPage');
        }

        req.body.category_image = req.file.path;
        const newCategory = await Category.create(req.body);
        
        req.flash('success', `${req.body.category_name} added successfully! ✅`);
        return res.redirect('/category/viewCategoryPage');
    } catch (err) {
        console.log("❌ Insert Category Error:", err);
        if (req.file) await deleteFile(req.file.path);
        req.flash('error', err.message || 'Failed to add category');
        return res.redirect('/category/addCategoryPage');
    }
};

// View Category Page
module.exports.viewCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find().sort({ createdAt: -1 });
        const stats = {
            total: allCategory.length,
        };
        // template file is named viewcategoryPage.ejs
        return res.render('category/viewcategoryPage', { allCategory, stats });
    } catch (err) {
        console.log("❌ View Category Error:", err);
        req.flash('error', 'Failed to load categories');
        return res.redirect('/dashboard');
    }
};

// Delete Category
module.exports.deleteCategory = async (req, res) => {
    try {
        if (!req.query.Id) {
            req.flash('error', 'Invalid category ID');
            return res.redirect('/category/viewCategoryPage');
        }

        const deleted = await Category.findByIdAndDelete(req.query.Id);

        if (!deleted) {
            req.flash('error', 'Category not found');
            return res.redirect('/category/viewCategoryPage');
        }

        // Delete associated image
        if (deleted.category_image) {
            await deleteFile(deleted.category_image);
        }

        req.flash('success', `${deleted.category_name} deleted successfully! ✅`);
        return res.redirect('/category/viewCategoryPage');
    } catch (err) {
        console.log("❌ Delete Category Error:", err);
        req.flash('error', 'Failed to delete category');
        return res.redirect('/category/viewCategoryPage');
    }
};

// Edit Category Page
module.exports.editCategoryPage = async (req, res) => {
    try {
        if (!req.params.categoryId) {
            req.flash('error', 'Invalid category ID');
            return res.redirect('/category/viewcategoryPage');
        }

        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/category/viewcategoryPage');
        }

        // template file is named editcategoryPage.ejs
        return res.render('category/editcategoryPage', { category });
    } catch (err) {
        console.log("❌ Edit Category Page Error:", err);
        req.flash('error', 'Failed to load category');
        return res.redirect('/category/viewcategoryPage');
    }
};

// Update Category
module.exports.updateCategory = async (req, res) => {
    try {
        if (!req.params.categoryId) {
            req.flash('error', 'Invalid category ID');
            return res.redirect('/category/viewCategoryPage');
        }

        // Validate input
        const validationErrors = validateCategoryData(req.body);
        if (validationErrors.length > 0) {
            req.flash('error', validationErrors.join(', '));
            return res.redirect(`/category/editCategoryPage/${req.params.categoryId}`);
        }

        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/category/viewCategoryPage');
        }

        // Handle image update
        if (req.file) {
            req.body.category_image = req.file.path;
            // Delete old image
            if (category.category_image) {
                await deleteFile(category.category_image);
            }
        }

        const updated = await Category.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true, runValidators: true }
        );

        req.flash('success', `${updated.category_name} updated successfully! ✅`);
        return res.redirect('/category/viewCategoryPage');
    } catch (err) {
        console.log("❌ Update Category Error:", err);
        if (req.file) await deleteFile(req.file.path);
        req.flash('error', err.message || 'Failed to update category');
        return res.redirect(`/category/editCategoryPage/${req.params.categoryId}`);
    }
};