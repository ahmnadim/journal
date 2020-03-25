const Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
const db = require('../config/db');

const Post = require('./Post');

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		notNull: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		notNull: true
	},
	email: {
		type: Sequelize.STRING,
		notNull: true
	},
	password: {
		type: Sequelize.STRING,
		notNull: true
	}
	
});

// User.hasMany(Post, { foreignKey: 'userId' });
// User.associate = models => {
// 	User.hasMany(Post, { foreignKey: 'userId' });
// }

module.exports = User;

