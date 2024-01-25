const dbConfig = require("../config/db.config");
let Sequelize = require("sequelize");
let initModels = require("./init-models").initModels;
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid").v4;

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
        // console.log(date);
        const candidateData = Array.from({ length: 30 }, (_, index) => ({
            id: uuidv4(),
            candidate_id: `CANDIDATE_${index + 1}`,
            name: `Candidate ${index + 1}`,
            status: Math.random() < 0.5, // Random boolean value for status
            placevalue: index + 11
          }));
        let obj = [
            {
                id: "4e02f09d-3c8c-4e4b-8e7a-2d1d394924b3",
                topic: "Topic D",
                type: "INTERNAL",
                managername: "Chris Taylor",
                password: bcrypt.hashSync("SecurePwd789",salt),
                startdate: '2024-01-21',
                starttime: '10:46:00',
                candidates: [
                    ...candidateData,
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
