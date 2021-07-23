const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('channels', {
        id_channels: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: type.DATE,
            default: moment.unix(),
            allowNull: false
        },
        updatedAt:{
            type: type.DATE,
            default: moment.unix(),
            allowNull: false
        }
    });
};