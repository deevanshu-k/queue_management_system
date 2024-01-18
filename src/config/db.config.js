module.exports = (() => {
    if (process.env.NODE_ENV == "production") {
        return {
            HOST: process.env.P_DB_HOST,
            USER: process.env.P_DB_USER,
            PASSWORD: process.env.P_DB_PSWD,
            DB: process.env.P_DB_NAME,
            dialect: "mysql",
            logging: console.log,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        };
    }
    return {
        HOST: process.env.D_DB_HOST,
        USER: process.env.D_DB_USER,
        PASSWORD: process.env.D_DB_PSWD,
        DB: process.env.D_DB_NAME,
        dialect: "mysql",
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    };
})();
