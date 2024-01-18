let DataTypes = require("sequelize").DataTypes;
const _candidate = require('./candidate');
const _queue = require('./queue');

function initModels(sequelize) {
    let candidate = _candidate(sequelize, DataTypes);
    let queue = _queue(sequelize, DataTypes);
    
    queue.hasMany(candidate, { as: "candidates" });
    candidate.belongsTo(queue, {
        foreignKey: "queueId",
        as: "queue"
    })

    return {
        queue,
        candidate
    }
}

module.exports = { initModels };