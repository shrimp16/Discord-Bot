const Sequelize = require('sequelize');
const sequelize = new Sequelize('casino_bot', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;