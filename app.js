const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);

// Path: routes/index.js
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});
