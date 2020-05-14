const User = require("../models/user");

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
      return res.json({ success: true });
    });
  });
};
