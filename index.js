const express = require('express');
const path = require('path');
const morgan = require('morgan');

const route = require('./routes');

const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port);