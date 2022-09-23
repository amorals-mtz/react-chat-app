const express = require('express');
const app = express();
const PORT = 4000;

// Import HTTP and CORS library to allow data transfer between the client and the server domains.
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());


// Add Socket.io to create a real-time connection.
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// Establish a connection with the React app whenever a user visits the web page.
// IMPORTANT: Make sure to add this before the `app.get()` block.
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Listen the `message` event from the React app client and send 
    // the message to all connected clients.
    socket.on('message', (data) => {
        console.log(data);
        socketIO.emit('messageResponse', data);
    });

    // When a user refreshes or closes the web page, the socket fires the disconnect event.
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

socketIO.on('connect_error', (error) => {
    console.log(`connect_error due to ${error.message}`);
});


app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});