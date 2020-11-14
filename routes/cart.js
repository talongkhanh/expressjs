
const express = require('express');

const controller = require('../controllers/CartController');


const router = express.Router();

router.get('/add/:id', controller.addToCart);

module.exports = router;
