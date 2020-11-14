
const md5 = require('md5');

const User = require('../models/User');

module.exports.login = function(req, res) {
	res.render('auth/login');
}

module.exports.logout = function(req, res) {
	res.clearCookie('userId');
	res.redirect('/');
}

module.exports.signup = function(req, res) {
	res.render('auth/signup');
}

module.exports.store = async function(req, res) {
	const errors = [];

		if (!req.body.name) {
			errors.push('Name is requires.');
		}
		if (!req.body.phone) {
			errors.push('Phone is requires.');
		}
		if (!req.body.email) {
			errors.push('Email is requires.');
		}
		if (!req.body.password) {
			errors.push('Password is requires.');
		}
		if (errors.length) {
			res.render('auth/signup', {
			errors: errors,
			formData: req.body,
			});
			return;
		}

		const { name, phone, email, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			res.render('auth/signup', {
				errors: ['Two password not match.'],
				formData: req.body,
			});
			return;
		}

		const existEmail = await User.findOne({ email: email });
		if (existEmail) {
			res.render('auth/signup', {
				errors: ['Email already exists.'],
				formData: req.body,
			});
			return;
		}

		const existPhone = await User.findOne({ phone: phone });
		if (existPhone) {
			res.render('auth/signup', {
				errors: ['phone already exists.'],
				formData: req.body,
			});
			return;
		}

		const newUser = {
			name: name,
			phone: phone,
			email: email,
			password: md5(password),
		}
		User.create(newUser);
		res.redirect('/auth/login');

}

