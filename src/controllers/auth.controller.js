"use strict";
const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports.authQueueManager = {
    validator: celebrate({
        body: Joi.object().keys({
            queueId: Joi.string()
                .guid({
                    version: ["uuidv4"],
                })
                .required(),
            password: Joi.string().required(),
        }),
    }),
    controller: async (req, res) => {
        try {
            const queueId = req.body.queueId;
            const pswd = req.body.password;
            // Find Queue
            let queue = await db.queue.findOne({
                where: {
                    id: queueId,
                },
            });

            // Validate Queue And Password
            if (queue && bcrypt.compareSync(pswd, queue.password)) {
                // Create JWT Token
                const jwtToken = jwt.sign(
                    {
                        id: queue.id,
                        managername: queue.managername,
                        topic: queue.topic,
                        type: queue.type,
                    },
                    process.env.SECRET,
                    {
                        expiresIn: process.env.TOKEN_EXP_TIME,
                    }
                );
                res.status(200).json({
                    token: jwtToken,
                });
            } else {
                res.status(401).json({
                    message: "Wrong id or password !",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};
