const { DataTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("queue", {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false
        },
        type: { // INTERNAL | EXTERNAL | INTERVIEW
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false
        },
        status: { // PENDING | ONGOING | COMPLETED
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING'
        },
        managername: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        starttime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    });
};
