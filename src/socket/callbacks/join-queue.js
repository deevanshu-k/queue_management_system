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
                    throw {
                        code: 1023,
                        message: "Queue Not Exist !",
                    };
                }
            } else {
                throw {
                    code: 1024,
                    message: "Queue Id Required !",
                };
            }
        } catch (error) {
            console.log(error);
            socket.emit("MESSAGE", {
                code: error.code,
                error: error.message,
            });
        }
    };
};
module.exports = { joinQueueDriver };
