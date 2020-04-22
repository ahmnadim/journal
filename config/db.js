const Sequelize = require('sequelize');
const UserModel = require('../models/User');
const PostModel = require('../models/Post');


const sequelize = new Sequelize('blog', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min:0,
		acquire: 30000,
		idle: 10000
	}
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

let models = {User, Post}

User.associate(models);
Post.associate(models);

module.exports = {sequelize, User, Post};