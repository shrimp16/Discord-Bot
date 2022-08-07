const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    cash: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = User;