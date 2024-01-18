const { DataTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("queue", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUID,
        },
        topic: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false
        },
        type: {
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
