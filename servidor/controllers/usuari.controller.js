const mongoose = require("mongoose");
const User = require('../models/usuari');
const service = require('../services/services');

const authCtrl = {};

authCtrl.register = async (req, res) => {
  const pass = await service.encodePassowrd(req.body.contrasenya);

  const user = new User({ email: req.body.email, contrasenya: pass })

  console.log(user);
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
      token: service.createToken(user)
    })
  })
};

module.exports = authCtrl;