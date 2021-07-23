const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('countries', {
        id_countries: {
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
        region:{
            type: type.INTEGER,
            allowNull: false
        },
        updatedAt:{
            type: type.DATE,
            default: moment.unix(),
            allowNull: false
        }
    });
};
