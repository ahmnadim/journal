const db = require('../config/db');
const Sequelize = require('sequelize');

const PostTag = db.define('PostTag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    }
});

module.exports = PostTag;