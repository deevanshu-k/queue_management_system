const dbConfig = require("../config/db.config");
let Sequelize = require("sequelize");
let initModels = require("./init-models").initModels;
const jwt = require("jsonwebtoken");

// create sequelize instance with database connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    logging: dbConfig.logging,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// load the model definitions into sequelize

var models = initModels(sequelize);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

(async () => {
    try {
        await models.sequelize.sync({ force: true });
        let date = new Date();
        console.log(date);
        let obj = [
            {
                id: "4e02f09d-3c8c-4e4b-8e7a-2d1d394924b3",
                topic: "Topic D",
                type: "INTERNAL",
                managername: "Chris Taylor",
                password: "SecurePwd789",
                startdate: date,
                starttime: date,
                candidates: [
                    {
                        id: "1031",
                        candidate_id: "0834CS211031",
                        name: "Ella Wilson",
                    },
                    {
                        id: "1032",
                        candidate_id: "0834CS211032",
                        name: "Finn Jackson",
                    },
                    {
                        id: "1033",
                        candidate_id: "0834CS211033",
                        name: "Gemma Smith",
                    },
                    {
                        id: "1034",
                        candidate_id: "0834CS211034",
                        name: "Hugo Moore",
                    },
                    {
                        id: "1035",
                        candidate_id: "0834CS211035",
                        name: "Isla Brown",
                    },
                    {
                        id: "1036",
                        candidate_id: "0834CS211036",
                        name: "Jake Davis",
                    },
                    {
                        id: "1037",
                        candidate_id: "0834CS211037",
                        name: "Kylie Miller",
                    },
                    {
                        id: "1038",
                        candidate_id: "0834CS211038",
                        name: "Leo Taylor",
                    },
                    {
                        id: "1039",
                        candidate_id: "0834CS211039",
                        name: "Mila Wilson",
                    },
                    {
                        id: "1040",
                        candidate_id: "0834CS211040",
                        name: "Nolan Jackson",
                    },
                ],
            },
        ];

        await models.queue.bulkCreate(obj, {
            include: [
                {
                    model: models.candidate,
                    as: "candidates",
                },
            ],
        });

        const jwtToken = jwt.sign(
            {
                id: obj[0].id,
                managername: obj[0].managername,
                topic: obj[0].topic,
                type: obj[0].type,
            },
            process.env.SECRET,
            {
                expiresIn: process.env.TOKEN_EXP_TIME,
            }
        );
        console.log("----------Token--------");
        console.log("queueId : " + obj[0].id);
        console.log("token : " + jwtToken);
        console.log("-----------------------");
    } catch (error) {
        console.log(error);
    }
})();

module.exports = models;
