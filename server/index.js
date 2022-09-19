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
    // When a user refreshes or closes the web page, the socket fires the disconnect event.
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});