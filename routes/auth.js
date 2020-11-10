
const express = require('express');

const controller = require('../controllers/AuthController');

const router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.check);

router.get('/logout', controller.logout);


module.exports = router;
