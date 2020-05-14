exports.signup = function (req, res, next) {
  console.log(req.body);
  res.send({ success: true });
  // see if user with given email exists
  // if user does exist return an error
  // if user doesn't exist, create and save user record
  // respond to request indicating user was created
};
