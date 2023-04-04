const express = require('express');
const path = require('path');

// Path: routes/index.js
const app = express();
const port = 8000;
const ip = '127.0.0.1';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);

});

app.listen(port, () => {
    console.log('Server listening at port %d', port);
});
