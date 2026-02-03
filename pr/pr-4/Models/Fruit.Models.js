const mongoose = require('mongoose');

const FruitSchema = mongoose.Schema({
    FruitName: {
        type: String,
        required: true
    },
    FruitPrice: {
        type: Number,
        required: true
    },
    FruitImage: {
        type: String,
        required: true
    },
    
});

const Fruit = mongoose.model("Fruit", FruitSchema, "Fruits");
module.exports = Fruit;
