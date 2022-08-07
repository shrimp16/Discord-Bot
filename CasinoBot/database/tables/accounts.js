const Sequelize = require('sequelize');
const database = require('../db');

const Account = database.define('account', {
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

module.exports = Account;