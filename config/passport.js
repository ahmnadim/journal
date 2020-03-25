const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (passport) => {
	passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
			User.findOne({where: {email: email}})
			.then(user => {
				if (!user) {
					console.log('email not registerd.');
					return done(null, false, {message: 'Invalid E-mail or Password!'});
				}

				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;

					if (isMatch) {
						return done(null, user);
					}else{
						console.log('password not matched.');
						return done(null,  false, {message: 'Invalid E-mail or Password!'});
					}
				});
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
	    User.findByPk(id, (err, user) => {
	      done(err, user);
		});
	});

}