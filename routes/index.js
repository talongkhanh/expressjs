
const userRouter = require('./user');
const siteRouter = require('./site');
const authRouter = require('./auth');

const authMiddleware = require('../middlewares/auth');

function route(app) {

	app.use('/users', authMiddleware.requireAuth, userRouter);

	app.use('/auth', authRouter);
	
	app.use('/', siteRouter);
}

module.exports = route;
