const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('companies', {
        id_companies: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        address:{
            type: type.STRING(255),
            allowNull: false
        },
        city:{
            type: type.INTEGER,
            allowNull: false
        },
        number:{
            type: type.INTEGER,
            allowNull: false
        },
        email:{
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