
const md5 = require('md5');
const shortId = require('shortid');

const db = require('../db');

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

	store(req, res) {
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
		
		if (db.get('users').find({ email }).value()) {
			res.render('auth/signup', {
				errors: ['Email was exists.'],
				formData: req.body,
			});
			return;
		}

		if (db.get('users').find({ phone }).value()) {
			res.render('auth/signup', {
				errors: ['Phone number was exists.'],
				formData: req.body,
			});
			return;
		}

		if(password !== confirmPassword) {
			res.render('auth/signup', {
				errors: ['Two password not match.'],
				formData: req.body,
			});
			return;
		}

		const newUser = {
			name: name,
			phone: phone,
			email: email,
			password: md5(password),
			id: shortId.generate()
		}
		db.get('users').push(newUser).write();
		res.redirect('/auth/login');

	}

}

module.exports = new AuthController;
