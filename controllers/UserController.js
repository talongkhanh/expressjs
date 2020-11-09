const shortId = require('shortid');

const db = require('../db');

class UserController {
	// [GET] /users
	index(req, res) {

		res.render('users/index', {
			users: db.get('users').value(),
		});
	}
	// [GET] /users/create
	create(req, res) {

		res.render('users/create');
	}
	// [POST] /users/create
	store(req, res) {

		req.body.id = shortId.generate();
		db.get('users').push(req.body).write();
		res.redirect('/users');
	}
	// [GET] /users/search
	search(req, res) {
		const q = req.query.q;

		if(q) {

			const matchedUsers = db.get('users').value().filter(user => {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
			});
			res.render('users/index', {
				users: matchedUsers,
				q: q,
			});
		} else {

			res.redirect('/users');
		}
		
	}
	// [GET] /users/userId
	show(req, res) {

		const id = req.params.userId;
		const user = db.get('users').find({id: id}).value();
		res.render('users/show', {
			user: user,
		});
	}

}

module.exports = new UserController;