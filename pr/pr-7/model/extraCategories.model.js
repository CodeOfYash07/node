const mongoose = require('mongoose')

const extraCategorySchema = mongoose.Schema({
    extraCategory_name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategories',
        required: true
    }
});

const extraCategories = mongoose.model('extraCategories', extraCategorySchema);
module.exports = extraCategories;
