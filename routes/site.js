const express = require('express');

const siteController = require('../controllers/SiteController');

const router = express.Router();

router.get('/', siteController.index);

module.exports = router;