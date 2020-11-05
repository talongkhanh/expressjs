const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const users = [
			{ id: 1, name: 'Minh' },
			{ id: 2, name: 'Nam' },
];

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
		users: users,
	});
});

app.get('/users/create', (req, res) => {
	res.render('users/create');
});

app.post('/users/create', (req, res) => {
	if(req.body.name) {
		users.push({ name: req.body.name });
	}
	res.redirect('/users');
});

app.get('/users/search', (req, res) => {
	const q = req.query.q;
	if(q) {
		const matchedUsers = users.filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
		res.render('users/index', {
			users: matchedUsers,
			q: q,
		});
	} else {
		res.redirect('/users');
	}
	
})


app.listen(port, () => console.log('Server listen on port ', port));