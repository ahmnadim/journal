const Sequelize = require('sequelize');
const db = require('../config/db');

const User = require('./User');

const Post = db.define('post', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		notNull: true,
		primaryKey: true
	},
	
	title: {
		type: Sequelize.STRING,
		notNull: true
	},
	imageUrl: {
		type: Sequelize.STRING,
		notNull: true
	},
	description: {
		type: Sequelize.TEXT,
		notNull: true
	},
	author: {
		type: Sequelize.STRING,
		notNull: true
	}
});

// Post.associate = (models) => {
// 	Post.belongsTo(models.User);
// 	User.hasMany(models.Post);
// }

module.exports = Post;

