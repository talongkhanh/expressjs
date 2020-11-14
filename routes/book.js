const express = require('express');
const multer  = require('multer');
var csrf = require('csurf') 

var csrfProtection = csrf({ cookie: true })

const upload = multer({ dest: 'public/uploads/' });

const controller = require('../controllers/BookController');

const validation = require('../validation/book');

const router = express.Router();

router.get('/create', csrfProtection, controller.create);

router.post('/create', upload.single('image'), validation.inputRequire ,csrfProtection, controller.store);

router.get('/search', controller.search);

router.get('/:userId', controller.show);

router.get('/', controller.index);

module.exports = router;