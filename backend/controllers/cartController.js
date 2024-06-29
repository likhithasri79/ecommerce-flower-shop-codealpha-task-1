const Cart = require('../models/cartModel');
const Flower = require('../models/flowerModel');
const Order = require('../models/orderModel');

const addToCart = async(req, res)=>{
    const {flowerId, quantity} = req.body;
    const userId = req.user._id;
    try{
        let cart = await Cart.findOne({user: userId});
        if(!cart){
            cart = new Cart({user: userId, items:[], total:0});
        }
        const flower = await Flower.findById(flowerId);
        // const flower = await Flower.findOne({flower: flowerId});
        if(!flower){
            return res.status(404).json({message: 'Flower not found'});
        }
        const itemIndex = cart.items.findIndex(item=>item.flower.toString()===flowerId);
        if(itemIndex>-1){
            cart.items[itemIndex].quantity += quantity;
        } else{
            cart.items.push({flower: flowerId, quantity});
        }
        cart.total += flower.price * quantity;
        await cart.save();
        res.status(201).json(cart);
    }
    catch(error){
        console.error('Error adding to cart:',error);
        res.status(500).json({message: error.message});
    }
};

const getCart = async(req,res)=>{
    const userId = req.user._id;
    try{
        const cart = await Cart.findOne({user: userId}).populate('items.flower');
        if(!cart){
            return res.status(404).json({message: 'Cart not found'});
        }
        res.status(200).json(cart);
    }
    catch(error){
        console.log('Error fetching cart:', error);
        res.status(500).json({message: error.message});
    }
};

const checkout = async(req,res)=>{
    const userId = req.params.userId;
    const {shippingAddress} = req.body;
    try{
        const cart = await Cart.findOne({user: userId});
        if(!cart){
            return res.status(404).json({message: 'Cart not found'});
        }
        const orderItems =  cart.items.map(item =>({
            flower: item.flower._id,
            quantity: item.quantity,
            price: item.flower.price
        }));
        const order = new Order({
            user: userId,
            items: orderItems,
            total: cart.total,
            shippingAddress: shippingAddress,
            isPaid: false,
            isDelivered: false
        });
        const createdOrder = await order.save();

        cart.items =[];
        cart.total = 0;
        await cart.save();
        res.status(201).json({message: 'Checkout successful', order: createdOrder});
    }
    catch(error){
        console.error('Error during checkout:',error);
        res.json(500).json({message: error.message});
    }
};

const removeItemFromCart = async (req, res) => {
    const { userId, flowerId } = req.params;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.flower.toString() !== flowerId);
        cart.total = cart.items.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, checkout, removeItemFromCart };


