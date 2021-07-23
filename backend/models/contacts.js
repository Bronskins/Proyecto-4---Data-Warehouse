const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('contacts', {
        id_contacts: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: type.STRING(255),
            allowNull: false
        },
        lastName: {
            type: type.STRING(255),
            allowNull: false
        },
        email: {
            type: type.STRING(255),
            allowNull: false
        },
        address: {
            type: type.STRING(255),
            allowNull: false
        },
        interest: {
            type: type.INTEGER,
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
        company:{
            type: type.INTEGER,
            allowNull: false
        },
        city: {
            type: type.INTEGER,
            allowNull: false
        },
        role: {
            type: type.INTEGER,
            allowNull: false
        }
    })
};