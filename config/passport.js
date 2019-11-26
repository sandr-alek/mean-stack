const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const dbConfig = require('../config/db');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = dbConfig.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('123', jwt_payload);
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if (err) return done(err, false);
        return user ? done(null, user) : done(null, false);
      });
    })
  );
}