
const db = require('../db');


module.exports.requireAuth = function(req, res, next) {

	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	const user = db.get('users').find({id: req.signedCookies.userId}).value();

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;
	next();
}

module.exports.hasLogin = function(req, res, next) {
	const user = db.get('users').find({id: req.signedCookies.userId}).value();
	const reqPath = req.url;
	if(user) {
		if(reqPath === '/login') {
			res.redirect('/');
			return;
		}
		res.locals.user = user;
		next();
		return;
	}
	next();
}
