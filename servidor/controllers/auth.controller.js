const passport = require("passport");
const mongoose = require("mongoose");
const User = require('../models/user');

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
authCtrl.profileRead = (req, res) => {
  // Si la id del usuari no existeix en el JWT retorna un 401
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};

module.exports = authCtrl;
