const express = require('express');

const userController = require('../controllers/UserController');

const validation = require('../validation/user');

const router = express.Router();

router.get('/create', userController.create);

router.post('/create', validation.inputRequire, userController.store);

router.get('/search', userController.search);

router.get('/:userId', userController.show);

router.get('/', userController.index);

module.exports = router;