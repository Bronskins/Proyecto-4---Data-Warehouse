const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('cities', {
        id_cities: {
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
        },
        country:{
            type: type.INTEGER,
            allowNull: false
        }
    });
};