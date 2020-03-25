const Sequlize = require('sequelize');
const db = require('../config/db');

const Category = db.define('Category', {
    id: {
        type: Sequlize.INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequlize.STRING,
        notNull: true
    }
});

module.exports = Category;