var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      // Retorna si l'usari no funciona a la BD
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Retorna si la contrasenya no és correcta
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // Si tot és correcta retorna l'objecta
      return done(null, user);
    });
  }
));