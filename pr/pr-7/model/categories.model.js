const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category_img: {
        type: String,
        required: true,
    },
    category_name: {
        type: String,
        required: true
    },
});

const categories = mongoose.model('categories', categorySchema);
module.exports = categories;