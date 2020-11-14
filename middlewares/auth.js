
const User = require('../models/User');

module.exports.requireAuth = async function(req, res, next) {

	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	const user = await User.findOne({_id: req.signedCookies.userId});

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;
	next();
}

module.exports.hasLogin = async function(req, res, next) {
	const user = await User.findOne({_id: req.signedCookies.userId});
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
