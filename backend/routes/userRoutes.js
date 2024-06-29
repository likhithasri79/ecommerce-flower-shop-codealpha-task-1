const express = require('express');
const {registerUser, authUser, getUserProfile} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',authUser);
router.get('/profile',authMiddleware,getUserProfile);

module.exports = router;