const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    subCategory_name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }
});

const subCategories = mongoose.model('subCategories', subCategorySchema);
module.exports = subCategories;