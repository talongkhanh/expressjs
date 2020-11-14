
const md5 = require('md5');

const User = require('../models/User');

module.exports.checkLogin = async function(req, res, next) {

	const { email, password } = req.body;

	const hashedPassword = md5(password);
	
	const user = await User.findOne({ email });

	if (!user) {
		res.render('auth/login', {
			errors: [
				'User does not exists.'
			],
			formData: req.body
		});
		return;
	}

	console.log(user);
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
