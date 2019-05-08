const mongoose = require("mongoose");
const User = require('../models/usuari');
const service = require('../services/services');

const authCtrl = {};

authCtrl.register = (req, res) => {
  const user = new User({ email: req.body.email })
  let a = user.setPassword(req.body.contrasenya);

  console.log(a)

  user.save((err) => {
    if(err) res.status(500).send({message: `s'ha produït un error al guardar l'usuari: ${err}`});

    res.status(200).send({ token: service.createToken(user) })
  });
};
authCtrl.login = (req, res, next) => {
  User.find({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).send({ message: err });
    if(!user) return res.status(404).send({ message: 'No existeix lusuari' });

    req.user = user;
    res.status(200).send({
      message: 'Has fet login correctament',
      token: service.createToken(user)
    })
  })
};
authCtrl.profileRead = (req, res) => {
  /*
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
  })*/
}

module.exports = authCtrl;
