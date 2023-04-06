const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res) => {
    res.status(404);
    res.type('html');
    res.send('<h1>404 - Not Found</h1>');
});

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/submit', (req, res) => {
    let sql = 'INSERT INTO users VALUES(null, post[0], post[1], post[2])';
    let post = {
        name: document.getElementById('name_id').value,
        email: document.getElementById('email_id').value,
        phone: document.getElementById('phone_id').value,
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
