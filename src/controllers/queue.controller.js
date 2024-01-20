const { celebrate, Joi } = require("celebrate");
const db = require("../models");
const uuidv4 = require("uuid").v4;
var pswdGenerator = require("generate-password");
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
            zip_code: Joi.number().required(),
        }),
    }),
    controller: async (req, res) => {
        res.send("Update Queue");
    },
};

module.exports.deleteQueue = {
    validator: celebrate({
        body: Joi.object().keys({
            zip_code: Joi.number().required(),
        }),
    }),
    controller: async (req, res) => {
        res.send("Delete Queue");
    },
};
