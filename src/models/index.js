const dbConfig = require("../config/db.config");
let Sequelize = require("sequelize");
let initModels = require("./init-models").initModels;
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
        let date = new Date();
        console.log(date);
        let obj = [
            {
                id: "1a5e9f91-46da-4d29-8b09-c27f3b6d5a3f",
                topic: "Topic A",
                type: "EXTERNAL",
                managername: "John Doe",
                password: "Password123",
                startdate: date,
                starttime: date,
                candidates: [
                    {
                        id: "1001",
                        candidate_id: "0834CS211001",
                        name: "Alice Smith",
                        status: true
                    },
                    {
                        id: "1002",
                        candidate_id: "0834CS211002",
                        name: "Bob Johnson",
                    },
                    {
                        id: "1003",
                        candidate_id: "0834CS211003",
                        name: "Charlie Brown",
                        status: true
                    },
                    {
                        id: "1004",
                        candidate_id: "0834CS211004",
                        name: "David Williams",
                    },
                    {
                        id: "1005",
                        candidate_id: "0834CS211005",
                        name: "Eva Davis",
                    },
                    {
                        id: "1006",
                        candidate_id: "0834CS211006",
                        name: "Frank Miller",
                    },
                    {
                        id: "1007",
                        candidate_id: "0834CS211007",
                        name: "Grace Wilson",
                    },
                    {
                        id: "1008",
                        candidate_id: "0834CS211008",
                        name: "Henry Jackson",
                        status: true
                    },
                    {
                        id: "1009",
                        candidate_id: "0834CS211009",
                        name: "Ivy Moore",
                    },
                    {
                        id: "1010",
                        candidate_id: "0834CS211010",
                        name: "Jack Taylor",
                    },
                ],
            },
            {
                id: "2b9d03a4-c304-4b80-b5d7-cc6a0d86bf1d",
                topic: "Topic B",
                type: "INTERNAL",
                managername: "Jane Doe",
                password: "SecurePwd456",
                startdate: date,
                starttime: date,
                candidates: [
                    {
                        id: "1011",
                        candidate_id: "0834CS211011",
                        name: "Kelly Anderson",
                    },
                    {
                        id: "1012",
                        candidate_id: "0834CS211012",
                        name: "Liam Moore",
                    },
                    {
                        id: "1013",
                        candidate_id: "0834CS211013",
                        name: "Mia Brown",
                    },
                    {
                        id: "1014",
                        candidate_id: "0834CS211014",
                        name: "Noah Smith",
                    },
                    {
                        id: "1015",
                        candidate_id: "0834CS211015",
                        name: "Olivia Taylor",
                    },
                    {
                        id: "1016",
                        candidate_id: "0834CS211016",
                        name: "Peter Wilson",
                    },
                    {
                        id: "1017",
                        candidate_id: "0834CS211017",
                        name: "Quinn Johnson",
                    },
                    {
                        id: "1018",
                        candidate_id: "0834CS211018",
                        name: "Ryan Davis",
                    },
                    {
                        id: "1019",
                        candidate_id: "0834CS211019",
                        name: "Sophia Miller",
                    },
                    {
                        id: "1020",
                        candidate_id: "0834CS211020",
                        name: "Thomas Jackson",
                    },
                ],
            },
            {
                id: "3c8a7b6e-0717-4e88-96e3-6ea1a1f0c05c",
                topic: "Topic C",
                type: "EXTERNAL",
                managername: "Alex Johnson",
                password: "Pass321Word",
                startdate: date,
                starttime: date,
                candidates: [
                    {
                        id: "1021",
                        candidate_id: "0834CS211021",
                        name: "Ursula White",
                    },
                    {
                        id: "1022",
                        candidate_id: "0834CS211022",
                        name: "Vince Brown",
                    },
                    {
                        id: "1023",
                        candidate_id: "0834CS211023",
                        name: "Wendy Davis",
                    },
                    {
                        id: "1024",
                        candidate_id: "0834CS211024",
                        name: "Xander Miller",
                    },
                    {
                        id: "1025",
                        candidate_id: "0834CS211025",
                        name: "Yasmine Taylor",
                    },
                    {
                        id: "1026",
                        candidate_id: "0834CS211026",
                        name: "Zack Wilson",
                    },
                    {
                        id: "1027",
                        candidate_id: "0834CS211027",
                        name: "Aaron Jackson",
                    },
                    {
                        id: "1028",
                        candidate_id: "0834CS211028",
                        name: "Bella Smith",
                    },
                    {
                        id: "1029",
                        candidate_id: "0834CS211029",
                        name: "Cody Moore",
                    },
                    {
                        id: "1030",
                        candidate_id: "0834CS211030",
                        name: "Daisy Brown",
                    },
                ],
            },
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
    } catch (error) {
        console.log(error);
    }
})();

module.exports = models;
