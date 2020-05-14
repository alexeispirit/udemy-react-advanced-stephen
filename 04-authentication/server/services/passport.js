const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const User = require("../models/user");
const config = require("../config");

// create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // verify username and password
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // compare passwords
  });
});

// setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if user id in payload exists in database
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
