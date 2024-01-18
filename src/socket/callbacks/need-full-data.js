const db = require("../../models");

const needFullDataDriver = (io, socket) => {
    return async function needFullData(data) {
        try {
            if (data.id) {
                let queueData = await db.queue.findOne({
                    where: { id: data.id },
                    include: ["candidates"],
                });

                if (queueData) {
                    socket.emit("QUEUE FULL DATA", queueData);
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
module.exports = { needFullDataDriver };
