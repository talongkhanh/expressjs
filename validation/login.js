
const md5 = require('md5');

const db = require('../db');

module.exports.checkLogin = function(req, res, next) {

	const { email, password } = req.body;

	const hashedPassword = md5(password);
	
	const user = db.get('users').find({ email }).value();

	if (!user) {
		res.render('auth/login', {
			errors: [
				'User does not exists.'
			],
			formData: req.body
		});
		return;
	}


	if (hashedPassword !== user.password) {
		res.render('auth/login', {
			errors: [
				'Wrong password.'
			],
			formData: req.body
		});
		return;
	}
	res.cookie('userId', user.id, { signed: true });
	res.redirect('/books');
}
