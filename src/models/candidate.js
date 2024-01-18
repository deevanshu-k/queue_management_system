const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("candidate", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUID,
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
