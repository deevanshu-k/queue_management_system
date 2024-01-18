const socketio = require("socket.io");
const { onConnection } = require("./callbacks");

const setUpSocket = (server) => {
    let io = new socketio.Server(server, {
        cors: {
            origin: "*",
        },
    });

    global.socket = io;

    io.on("connection", onConnection(io));
};

module.exports = { setUpSocket };
