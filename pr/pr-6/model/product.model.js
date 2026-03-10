const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    extraCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ExtraCategory' },
    price: { type: Number, default: 0 },
    description: String,
    images: [String],
    // add any other product-specific fields here
});

module.exports = mongoose.model('Product', productSchema, 'Product');
