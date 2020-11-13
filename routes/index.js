
const userRouter = require('./user');
const siteRouter = require('./site');
const authRouter = require('./auth');
const productRouter = require('./product');

const authMiddleware = require('../middlewares/auth');

function route(app) {

	app.use('/users', authMiddleware.requireAuth, userRouter);

	app.use('/products', productRouter);

	app.use('/auth', authMiddleware.hasLogin, authRouter);
	
	app.use('/', authMiddleware.hasLogin, siteRouter);
}

module.exports = route;
