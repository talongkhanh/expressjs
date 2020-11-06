const express = require('express');
const path = require('path');
const morgan = require('morgan');
const low = require('lowdb');
const shortId = require('shortid');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
 
db.defaults({ users: [] })
  .write();

const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index', { 
		name: 'Khanh', 
		age: 20,
	});
});

app.get('/users', (req, res) => {
	res.render('users/index', {
		users: db.get('users').value(),
	});
});

app.get('/users/create', (req, res) => {
	res.render('users/create');
});

app.post('/users/create', (req, res) => {
	if(req.body.name) {
		req.body.id = shortId.generate();
		db.get('users').push(req.body).write();
	}
	res.redirect('/users');
});

app.get('/users/search', (req, res) => {
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
	
});

app.get('/users/:userId', (req, res) => {
	const id = req.params.userId;
	const user = db.get('users').find({id: id}).value();
	res.render('users/show', {
		user: user,
	});
});

app.listen(port, () => console.log('Server listen on port ', port));