
module.exports = (db, Sequelize) => {
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

	Post.associate = models => {
		Post.belongsTo(models.User);
	};

	return Post;
}
