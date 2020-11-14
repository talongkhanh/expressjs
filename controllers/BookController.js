
const Book = require('../models/Book');

module.exports.index = async function(req, res) {
	const books = await Book.find();
	res.render('books/index', { books: books });
}

module.exports.create = function(req, res) {
	res.render('books/create', { 
		csrfToken: req.csrfToken() 
	});
}

module.exports.store = async function(req, res) {

	if(req.file) {
		req.body.image = '/' + req.file.path.split('\\').slice(1).join('/');
	} else {
		req.body.image = '/img/book.png';
	}
	const book = {
		name: req.body.name,
		author: req.body.author,
		image: req.body.image,
	}
	Book.create(book);
	res.redirect('/books');
}

module.exports.search = async function(req, res) {
	const q = req.query.q;

	if(q) {
		const books = await Book.find()
		const matchedBooks = books.filter(book => {
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

module.exports.show = async function(req, res) {
	const id = req.params.bookId;
	const book = await Book.findOne({id: id});
	res.render('books/show', {
		book: book,
	});
}