const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("candidate", {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false
        },
        queueId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        candidate_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    });
};
