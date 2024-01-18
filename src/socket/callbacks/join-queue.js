const db = require("../../models");

const joinQueueDriver = (io, socket) => {
    return async function joinQueue(data) {
        try {
            if (data.id) {
                let queue = await db.queue.findOne({
                    where: { id: data.id },
                    include: ["candidates"],
                });
                if (queue) {
                    socket.join(queue.id);
                    socket.emit("MESSAGE", {
                        success: "Queue channel joined",
                    });
                    socket.emit("QUEUE FULL DATA", queue);
                } else {
                    throw new Error("Queue Not Exist !");
                }
            } else {
                throw new Error("Queue Id Required !");
            }
        } catch (error) {
            console.log(error.message);
            socket.emit("MESSAGE", {
                error: error.message,
            });
        }
    };
};
module.exports = { joinQueueDriver };
