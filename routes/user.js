const express = require('express');

const controller = require('../controllers/UserController');

const validation = require('../validation/user');

const router = express.Router();

router.get('/create', controller.create);

router.post('/create', validation.inputRequire, controller.store);

router.get('/search', controller.search);

router.get('/:userId', controller.show);

router.get('/', controller.index);

module.exports = router;