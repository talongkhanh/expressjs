const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index', { 
		name: 'Khanh', 
		age: 20,
	});
})

app.get('/users', (req, res) => {
	res.render('users/index', {
		users: [
			{ id: 1, name: 'Minh' },
			{ id: 2, name: 'Nam' },
		],
	});
})


app.listen(port, () => console.log('Server listen on port ', port));