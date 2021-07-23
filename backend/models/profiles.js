const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('profiles', {
        id_profiles: {
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt:{
            type: type.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });
};