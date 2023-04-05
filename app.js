const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

let connection = mysql.createConnection({
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
    let sql = 'INSERT INTO test SET ?';
    let post = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
    }

    connection.query((sql, err) => {
        if (err) throw err;
        console.log('Data inserted successfully');
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });

    res.status(200);
    res.type('html');

    connection.end();
});

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
