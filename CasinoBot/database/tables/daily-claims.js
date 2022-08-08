const Sequelize = require('sequelize');
const database = require('../db');
const Account = require('./accounts');

const DailyClaim = database.define('daily-claim', {
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
})

module.exports = DailyClaim;