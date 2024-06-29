const express = require('express');
const {getAllFlowers, getFlowerById} = require('../controllers/flowerController');
const router = express.Router();

router.get('/',getAllFlowers);
router.get('/:id',getFlowerById);

module.exports = router;