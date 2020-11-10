
const express = require('express');

const controller = require('../controllers/AuthController');

const validation = require('../validation/login');

const router = express.Router();

router.get('/login',controller.login);

router.post('/login', validation.checkLogin);

router.get('/logout', controller.logout);


module.exports = router;
