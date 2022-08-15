const Sequelize = require('sequelize');
const database = require('../db');
const Account = require('./accounts');

const CompaniesRevenue = database.define('companies-revenue', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    last_claim: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

CompaniesRevenue.belongsTo(Account, {
    constraint: true,
    foreignKey: 'user_id'
})

module.exports = CompaniesRevenue;