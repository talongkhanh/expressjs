
const bookRouter = require('./book');
const siteRouter = require('./site');
const authRouter = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');

const authMiddleware = require('../middlewares/auth');

function route(app) {

	app.use('/books', authMiddleware.requireAuth, bookRouter);

	app.use('/cart', cartRouter);

	app.use('/products', authMiddleware.hasLogin, productRouter);

	app.use('/auth', authMiddleware.hasLogin, authRouter);
	
	app.use('/', authMiddleware.hasLogin, siteRouter);
}

module.exports = route;
