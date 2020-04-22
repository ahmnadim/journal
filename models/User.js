
module.exports = (db, Sequelize) => {
	const User = db.define('user', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		isActive: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		hashedToken: {
			type: Sequelize.STRING,
			allowNull: true
		},
		expire: {
			type: Sequelize.DATE,
			allowNull: true
		}
		
	});

	User.associate = models => {
		User.hasMany(models.Post);
	};

	return User;
}