const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const authCtrl = {};

authCtrl.register = (req, res) => {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(err => {
    var token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};
authCtrl.login = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    var token;

    // Si hi ha algun error amb Passport
    if (err) {
      res.status(404).json(err);
      return;
    }

    // Si l'usuari funciona
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // Si usuari no fuciona
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = authCtrl;
