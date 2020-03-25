const db = require('../config/db');
const Sequelize = require('sequelize');

const CategoryPost = db.define('CategoryPost', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    }
});

module.exports = CategoryPost;