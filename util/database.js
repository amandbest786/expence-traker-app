const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root', 'arijit03', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;