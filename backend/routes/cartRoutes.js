const express = require('express');
const {addToCart, getCart, checkout, removeItemFromCart} = require('../controllers/cartController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/add',authMiddleware, addToCart);
router.post('/',authMiddleware, getCart);
// router.delete('/:userId/flower/:flowerId', removeItemFromCart);
router.post('/checkout/:userId',authMiddleware, checkout);

module.exports = router;