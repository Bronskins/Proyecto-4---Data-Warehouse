const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('contactmedia', {
        id_media: {
            type: type.INTEGER
        },
        id_contacts: {
            type: type.INTEGER,
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

