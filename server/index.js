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


let users = [];

// Establish a connection with the client application whenever a user visits the web page.
// IMPORTANT: Make sure to add this before the `app.get()` block.
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Listen the `message` event from the client application and
    // send back the message to all connected clients.
    socket.on('message', (data) => {
        console.log(data);
        socketIO.emit('messageResponse', data);
    });

    // Listen when a new user joins the server.
    socket.on('newUser', (data) => {
        // Adds the new user to the list of users.
        users.push(data);
        // console.log(users);

        // Sends the list of active users to all connected clients.
        socketIO.emit('newUserResponse', users);
    });

    // When a user refreshes or closes the web page, the socket fires the disconnect event.
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        // Updates the list of users when a user disconnects from the server.
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);

        // Sends the list of active users to all connected clients.
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
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