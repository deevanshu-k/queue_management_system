const { celebrate, Joi } = require("celebrate");
const socketUtils = require("../utils/socket");
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
        body: Joi.object().keys({
            candidate_id: Joi.string(),
            status: Joi.boolean(),
            name: Joi.string(),
        }),
        params: Joi.object().keys({
            candidateId: Joi.string().required(),
        }),
    }),
    controller: async (req, res) => {
        try {
            const candidateId = req.params.candidateId;
            const queueId = req.auth.id;
            let data = req.body;

            await db.candidate.update(data, {
                where: { id: candidateId, queueId: queueId },
            });

            let updatedCandidate = await db.candidate.findOne({
                where: { id: candidateId, queueId: queueId },
            });
            await socketUtils.emitCandidateUpdate(queueId, candidateId, updatedCandidate);
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

module.exports.deleteCandidateOfTheQueue = {
    validator: celebrate({
        body: Joi.object(),
        params: Joi.object().keys({
            candidateId: Joi.string().required(),
        }),
    }),
    controller: async (req, res) => {
        try {
            const candidateId = req.params.candidateId;
            const queueId = req.auth.id;

            await db.candidate.destroy({
                where: {
                    queueId: queueId,
                    id: candidateId,
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
