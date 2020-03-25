const db = require('../config/db');
const Sequelize = require('sequelize');

const Tag = db.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true
    }
});

module.exports = Tag;