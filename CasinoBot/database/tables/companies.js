const Sequelize = require('sequelize');
const database = require('../db');
const Account = require('./accounts');

const Companies = database.define('companies', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    dollar_store: {
        type: Sequelize.INTEGER
    },
    coffee_shop: {
        type: Sequelize.INTEGER
    },
    bakery: {
        type: Sequelize.INTEGER
    },
    supermaket: {
        type: Sequelize.INTEGER
    },
})

Companies.belongsTo(Account, {
    constraint: true,
    foreignKey: 'user_id'
})

module.exports = Companies;