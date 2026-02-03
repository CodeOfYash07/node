const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: String,
    storeImage: String,
    storePrice: Number
});

module.exports = mongoose.model("store", storeSchema);
