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
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/submit', (req, res) => {
    let sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';

    connection.query(sql, [req.body.name, req.body.email, req.body.phone], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            console.log("Data inserted")
            res.status(200).render('success', { message: 'Data inserted successfully' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log('Serving express HTTP on localhost at port %d', port);
});
