const shortId = require('shortid');

const db = require('../db');

class BookController {
	// [GET] /books
	index(req, res) {

		res.render('books/index', {
			books: db.get('books').value(),
		});
	}
	// [GET] /books/create
	create(req, res) {

		res.render('books/create');
	}
	// [POST] /books/create
	store(req, res) {

		req.body.id = shortId.generate();
		if(req.file) {
			req.body.image = req.file.path.split('\\').slice(1).join('\\');
		} else {
			req.body.image = 'img\\book.png';
		}
		db.get('books').push(req.body).write();
		res.redirect('/books');
	}
	// [GET] /books/search
	search(req, res) {
		const q = req.query.q;

		if(q) {
			const matchedBooks = db.get('books').value().filter(book => {
			return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
			});
			res.render('books/index', {
				books: matchedBooks,
				q: q,
			});
		} else {

			res.redirect('/books');
		}
		
	}
	// [GET] /books/bookId
	show(req, res) {
		const id = req.params.bookId;
		const book = db.get('books').find({id: id}).value();
		res.render('books/show', {
			book: book,
		});
	}

}

module.exports = new BookController;