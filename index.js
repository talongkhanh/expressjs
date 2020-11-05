const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.set('view engine', 'pug');
app.set('views', )
app.get('/', (req, res) => {
	res.json('khanh dep trai');
})
app.listen(port, () => console.log('Server listen on port ', port));