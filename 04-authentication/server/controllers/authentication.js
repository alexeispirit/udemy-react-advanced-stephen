const jwt = require("jwt-simple");

const config = require("../config");
const User = require("../models/user");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // user has already email and password auth'd
  // give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  // see if user with given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // if user does exist return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // if user doesn't exist, create and save user record
    const user = new User({ email, password });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // respond to request indicating user was created
      return res.json({ token: tokenForUser(user) });
    });
  });
};
