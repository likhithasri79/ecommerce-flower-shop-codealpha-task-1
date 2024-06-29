const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    flower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true
    },
    shippingAddress:{
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deleiveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;