const { celebrate, Joi } = require("celebrate");
const uuidv4 = require("uuid").v4;
const db = require("../models");

module.exports.addCandidateToQueue = {
    validator: celebrate({
        body: Joi.object().keys({
            candidates: Joi.array()
                .items(
                    Joi.object()
                        .keys({
                            candidate_id: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                        .required()
                )
                .required(),
        }),
    }),
    controller: async (req, res) => {
        try {
            const queueId = req.auth.id;
            let candidateData = [...req.body.candidates].map((d) => {
                return {
                    id: uuidv4(),
                    queueId: queueId,
                    ...d,
                };
            });
            await db.candidate.bulkCreate(candidateData);

            return res.status(200).json({
                message: "Added successfully!",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};

module.exports.updateCandidate = {
    validator: celebrate({
        body: Joi.object(),
    }),
    controller: async (req, res) => {
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};

module.exports.deleteCandidateOfTheQueue = {
    validator: celebrate({
        body: Joi.object(),
    }),
    controller: async (req, res) => {
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong !",
            });
        }
    },
};
