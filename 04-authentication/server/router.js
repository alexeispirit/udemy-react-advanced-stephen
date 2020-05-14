const passport = require("passport");

const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send("hello");
  });
  app.post("/signup", Authentication.signup);
};
