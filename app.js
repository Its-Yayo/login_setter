const express = require('express');
const path = require('path');

// Path: routes/main.js
const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
    res.type('html');
});

app.listen(port, () => {
    console.log('Serving express HTTP on localhost at port %d', port);
});
