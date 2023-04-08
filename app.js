const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

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
    if (err) {
        console.error("Error connecting to database: ", err);
        throw err;
    }
    console.log('Connected to database');
});

app.post('/submit', (req, res) => {
    console.log("Received form submission");
    console.log("Name:", req.body.name);
    console.log("Email:", req.body.email);
    console.log("Phone:", req.body.phone);

    let sql = 'INSERT INTO user (name, email, phone) VALUES (?, ?, ?)';

    console.log("Executing query...")
    connection.query(sql, [req.body.name, req.body.email, req.body.phone], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.status(200).render('login', { message: 'Login successful' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
});

app.listen(port, () => {
    console.log('Serving express HTTP on localhost at port %d', port);
});
