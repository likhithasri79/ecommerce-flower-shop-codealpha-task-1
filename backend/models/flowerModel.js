const mongoose = require('mongoose');
const { type } = require('os');

const flowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        reuqired: true
    },
    price:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
});

const Flower = mongoose.model('Flower',flowerSchema);
module.exports = Flower;