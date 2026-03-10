const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // you can add additional fields like `description` if required
});

module.exports = mongoose.model('Category', categorySchema, 'Category');
