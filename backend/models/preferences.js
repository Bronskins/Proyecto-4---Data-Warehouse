const moment = require('moment');

module.exports = (sequelize, type) => {
    return sequelize.define('preferences', {
        id_preferences: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        createdAt: {
            default: moment.unix(),
            type: type.DATE
        },
        updatedAt: {
            default: moment.unix(),
            type: type.DATE
        }
    })
};
