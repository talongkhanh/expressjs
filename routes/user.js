const express = require('express');

const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/create', userController.create);
router.post('/create', userController.store);

router.get('/search', userController.search);

router.get('/:userId', userController.find);

router.get('/', userController.index);

module.exports = router;