
const express = require('express');

const controller = require('../controllers/ProductController');


const router = express.Router();

router.get('/', controller.show);

module.exports = router;
