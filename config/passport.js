const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const User = require('../config/db').User;

module.exports = function(passport) {
  passport.use('local',
    new LocalStrategy({usernameField: 'email',	passwordField: 'password' }, (username, password, done) => {
      // Match user
      User.findOne({where: {email: username}}).then(user => {
		console.log(user.name);
        if (!user) {
			console.log('!user');
          return done(null, false, { message: 'That email is not registered' });
        }

		// Match password
		console.log(user.password, password);
		const isMatched = bcrypt.compareSync(password, user.password);
		
          if (isMatched) {
			  console.log('password matched.');
            return done(null, user);
          } else { console.log('password not matched.');
            return done(null, false, { error_msg: 'Password incorrect' });
          }	
      });
    })
  );

  passport.serializeUser(function(user, done) {
	  console.log('serialized: ', user.email);
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findByPk(id, function(err, user) {
		console.log('deserialized');

      return done(null, user);
    });
  });

};