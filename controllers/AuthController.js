
class AuthController {

	login(req, res) {

		res.render('auth/login');
	}

	logout(req, res, next) {
		res.clearCookie('userId');
		res.redirect('/');
		return;
	}

}

module.exports = new AuthController;
