const db = require("../models");

const calculateCount = async (queueId) => {
    let totalCandidates = await db.candidate.count({
        where: {
            queueId: queueId,
        },
    });
    let statusTrueCandidates = await db.candidate.count({
        where: {
            queueId: queueId,
            status: true,
        },
    });

    return [statusTrueCandidates, totalCandidates];
};

module.exports.emitQueueUpdate = async (queueId, data) => {
    try {
        let io = global.socket;
        let emittedData = {};
        if (data.topic) emittedData.topic = data.topic;
        if (data.type) emittedData.type = data.type;
        if (data.managername) emittedData.managername = data.managername;
        if (data.status) emittedData.status = data.status;
        if (data.startdate) emittedData.startdate = data.startdate;
        if (data.starttime) emittedData.starttime = data.starttime;
        let count = await calculateCount(queueId);
        await io.to(queueId).emit("QUEUE UPDATE", {
            count: count,
            queue: emittedData,
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports.emitCandidateUpdate = async (queueId, candidateId, data) => {
    try {
        let io = global.socket;
        let emittedData = {
            id: candidateId,
        };
        if (data.candidate_id) emittedData.candidate_id = data.candidate_id;
        if (data.status == true || data.status == false)
            emittedData.status = data.status;
        if (data.name) emittedData.name = data.name;
        let count = await calculateCount(queueId);
        await io.to(queueId).emit("QUEUE UPDATE", {
            count: count,
            candidate: emittedData,
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports.emitQueueFullData = async (queueId) => {
    try {
        let io = global.socket;
    
        let queueData = await db.queue.findOne({
            where: { id: queueId },
            include: {
                model: db.candidate,
                as: "candidates",
                attributes: ["id", "candidate_id", "status", "name"],
            },
            attributes: [
                "id",
                "topic",
                "type",
                "status",
                "managername",
                "startdate",
                "starttime",
            ],
        });
        await io.to(queueId).emit("QUEUE FULL DATA", queueData);
    } catch (error) {
        console.log(error);
    }
}