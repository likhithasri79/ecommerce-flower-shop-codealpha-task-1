const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    flower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;