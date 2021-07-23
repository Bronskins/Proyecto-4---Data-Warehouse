const moment = require('moment')

module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id_roles: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(255),
            allowNull: false
        }
    });
};