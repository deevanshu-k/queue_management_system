const { celebrate, Joi } = require("celebrate");

module.exports.addCandidateToQueue = {
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
