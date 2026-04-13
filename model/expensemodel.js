const database = require('../util/database');
const {DataTypes} = require('sequelize');

const Expense = database.define('expense', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
     amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    category: DataTypes.STRING
});

module.exports = Expense;