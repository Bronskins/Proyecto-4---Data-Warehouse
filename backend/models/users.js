const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id_users: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        lastName: {
            type: type.STRING(255),
            allowNull: false
        },
        username:{
            type: type.STRING(255),
            allowNull: false
        },
        email: {
            type: type.STRING(255),
            allowNull: false
        },
        profile: {
            type: type.INTEGER,
            allowNull: false
        },
        password: {
            type: type.STRING(255),
            allowNull: false
        }
    });
};