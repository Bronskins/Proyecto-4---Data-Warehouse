const moment = require('moment');

module.exports = (sequelize, type) => {
    return sequelize.define('media', {
        id_media: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        preferences: {
            type: type.INTEGER,
            allowNull: false
        },
        channels: {
            type: type.INTEGER,
            allowNull: false
        },
        channeldetail: {
            type: type.STRING(255),
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
