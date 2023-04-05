const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/submit', (req, res) => {
   console.log(req.body);
   res.render('index', { title: 'Data Saved', message: 'Data Saved Successfully' });
});

connection.end();

app.get('/api', (req, res) => {
    res.send('API is working');
    res.status(200);
    res.type('html');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
    res.type('html');
});

app.listen(port, () => {
    console.log('Serving express HTTP on localhost at port %d', port);
});
