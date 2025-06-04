const socketIO = require('socket.io');

const io = socketIO(/* Your HTTP server here, e.g., httpServer */);

io.on('connection', (socket) => {
    console.log('Client connected.');

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});

module.exports = io;
