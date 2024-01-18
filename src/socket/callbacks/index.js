const { joinQueueDriver } = require("./join-queue");
const { needFullDataDriver } = require("./need-full-data");

const configureSockets = (io, socket) => {
    return {
        joinQueue: joinQueueDriver(io,socket),
        needFullData: needFullDataDriver(io,socket),
    };
};
const onConnection = (io) => (socket) => {
    console.log("NEW CONNECTION: "+ socket.id);
    socket.emit("CONNECTION:SUCCESS", {
        success: "Connection Success !",
    });
    socket.use((socket,next) => {
        setTimeout(next,3000);
    })
    const { joinQueue, needFullData } = configureSockets(io, socket);
    socket.on("JOIN QUEUE", joinQueue);
    socket.on("NEED FULL DATA", needFullData);
};
module.exports = { onConnection };
