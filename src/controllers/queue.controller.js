const { celebrate, Joi } = require("celebrate");
const db = require("../models");
const uuidv4 = require("uuid").v4;
var pswdGenerator = require("generate-password");
const socketUtils = require("../utils/socket");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports.createQueue = {
    validator: celebrate({
        body: Joi.object().keys({
            topic: Joi.string().required(),
            type: Joi.string()
                .equal("INTERNAL", "EXTERNAL", "INTERVIEW")
                .required(),
            managername: Joi.string().required(),
            startdate: Joi.string().required(),
            starttime: Joi.string().required(),
            candidates: Joi.array()
                .items(
                    Joi.object().keys({
                        candidate_id: Joi.string().required(),
                        name: Joi.string().required(),
                    })
                )
                .required(),
        }),
    }),
    controller: async (req, res) => {
        try {
            // Generate Random Password
            let password = pswdGenerator.generate({
                length: 16,
                numbers: true,
                lowercase: true,
                uppercase: true,
            });
            // Create Data Object With UUID
            let data = {
                id: uuidv4(),
                topic: req.body.topic,
                type: req.body.type,
                managername: req.body.managername,
                startdate: req.body.startdate,
                starttime: req.body.starttime,
                password: bcrypt.hashSync(password, salt),
                candidates: [...req.body.candidates].map((d) => {
                    return {
                        id: uuidv4(),
                        ...d,
                    };
                }),
            };
            // Save To Db
            let savedData = await db.queue.create(data, {
                include: [
                    {
                        model: db.candidate,
                        as: "candidates",
                    },
                ],
                raw: true,
            });
            // Generate Manager Link + Viewer Link
            const managerUrl =
                process.env.MANAGER_URL +
                `?queueId=${savedData.id}&pswd=${password}`;
            const viewerUrl =
                process.env.VIEWER_URL + `?queueId=${savedData.id}`;

            res.status(200).json({
                manager_url: managerUrl,
                viewer_url: viewerUrl,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};

module.exports.updateQueue = {
    validator: celebrate({
        body: Joi.object().keys({
            topic: Joi.string(),
            type: Joi.string().equal("INTERNAL", "EXTERNAL", "INTERVIEW"),
            status: Joi.string().equal("PENDING", "ONGOING", "COMPLETED"),
            managername: Joi.string(),
            startdate: Joi.string(),
            starttime: Joi.string(),
        }),
    }),
    controller: async (req, res) => {
        try {
            let data = req.body;
            await db.queue.update(data, {
                where: { id: req.auth.id },
            });

            let updatedQueue = await db.queue.findOne({
                where: { id: req.auth.id },
            });
            await socketUtils.emitQueueUpdate(req.auth.id, updatedQueue);

            return res.status(200).json({
                message: "Updated successfully!",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};

module.exports.deleteQueue = {
    validator: celebrate({
        body: Joi.object(),
    }),
    controller: async (req, res) => {
        try {
            const queueId = req.auth.id;
            await db.candidate.destroy({
                where: {
                    queueId: queueId,
                },
            });
            await db.queue.destroy({
                where: {
                    id: queueId,
                },
            });

            return res.status(200).json({
                message: "Deleted successfully!",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};

module.exports.getQueue = {
    validator: celebrate({
        body: Joi.object(),
    }),
    controller: async (req, res) => {
        try {
            const queueId = req.auth.id;
            let queue = await db.queue.findOne({
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

            return res.status(200).json(queue);
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};
