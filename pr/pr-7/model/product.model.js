const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    old_price: {
        type: Number,
        default: null
    },
    new_price: {
        type: Number,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', required: true
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'subCategories',
        required: true
    },
    extraCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extraCategories',
        required: true
    },
    product_img: { type: String }
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
