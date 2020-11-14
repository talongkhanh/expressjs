
const md5 = require('md5');

const User = require('../models/User');

class AuthController {

	login(req, res) {

		res.render('auth/login');
	}

	logout(req, res, next) {
		res.clearCookie('userId');
		res.redirect('/');
		return;
	}

	signup(req, res) {
		res.render('auth/signup');
	}

	store(req, res, next) {
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
			errors.push('Two password not match.');
			res.render('auth/signup', {
				errors: errors,
				formData: req.body,
			});
			return;
		}
		
		function findUser() {
			return User.findOne({ email: email })
			  	.then(function(user) {
					if (user) {
						res.render('auth/signup', {
							errors: ['Email already exists.'],
							formData: req.body,
						});
					}
				});
		  }

		findUser().then(function() {
		return User.findOne({ phone: phone })
			.then(function(user) {
				if (user) {
					res.render('auth/signup', {
						errors: ['phone already exists.'],
						formData: req.body,
					});
				}
			});
		});

		findUser().then(function() {
			const newUser = {
				name: name,
				phone: phone,
				email: email,
				password: md5(password),
			}
			User.create(newUser);
			res.redirect('/auth/login');		
		}).catch(function(err) {
			console.log(err.message);
		});
	}
}

module.exports = new AuthController;
