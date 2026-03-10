const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema, 'ExtraCategory');
