const Sequelize = require('sequelize');
const database = require('../db');
const Account = require('./accounts');

const BankAccount = database.define('bank-account', {
    cash: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
})

BankAccount.belongsTo(Account, {
    constraint: true,
    foreignKey: 'user_id'
})

module.exports = BankAccount;