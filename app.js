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

    let sql = "INSERT INTO user VALUES (null, '"+ req.body.name +"', '"+ req.body.email +"', '"+  req.body.phone +")";

    console.log("Executing query...")
    connection.query(sql, err => {
        if (err) {
            console.error(err);
            res.status(500).render('login', { message: 'Error inserting data into database' });
        } else {
            res.status(200).render('login', { message: 'Data inserted' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404);
    res.type('html');
    res.send('<h1>404 - Not Found</h1>');
});

app.listen(port, () => {
    console.log('Serving express HTTP on localhost at port %d', port);
});
