const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const User = require('../config/db').User;

module.exports = function(passport) {
  passport.use('local',
    new LocalStrategy({usernameField: 'email',	passwordField: 'password' }, (username, password, done) => {
      // Match user
      User.findOne({where: {email: username}}).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

		// Match password
		const isMatched = bcrypt.compareSync(password, user.password);
		
          if (isMatched) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }	
      });
    })
  );

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
      return done(null, user);
  }); 

};