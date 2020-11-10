
const db = require('../db');

class AuthController {

	login(req, res) {

		res.render('auth/login');
	}

	check(req, res, next) {

		const { email, password } = req.body;

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

		if (password !== user.password) {
			res.render('auth/login', {
				errors: [
					'Wrong password.'
				],
				formData: req.body
			});
			return;
		}
		res.cookie('userId', user.id);
		res.redirect('/users');
	}

	logout(req, res, next) {
		res.clearCookie('userId');
		res.redirect('/');
		return;
	}

}

module.exports = new AuthController;
