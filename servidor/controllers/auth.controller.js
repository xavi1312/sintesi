const passport = require("passport");
const mongoose = require("mongoose");
//const User = require('../models/user');
const User = mongoose.model("User");

const authCtrl = {};

authCtrl.register = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: "All fields required"
    });
    return;
  }
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(err => {
    if (err) {
      res.status(500);
      res.json({
        message: "hi ha hagut un error",
        error: err
      });
    }
    var token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};
authCtrl.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      message: "All fields required"
    });
    return;
  }
  
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
authCtrl.totsUsuaris = (req,res) => {
  User.find({}).exec((err,user) => {
    res.status(200).json(user);
  })
}

module.exports = authCtrl;
