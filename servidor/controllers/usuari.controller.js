const mongoose = require("mongoose");
const User = require('../models/usuari');
const service = require('../services/services');

const authCtrl = {};

/** Registre d'un usuari */
authCtrl.register = async (req, res) => {
  const pass = await service.encodePassowrd(req.body.contrasenya);

  const user = new User({ email: req.body.email, contrasenya: pass })

  user.save((err) => {
    if(err) res.status(500).send({message: `s'ha produït un error al guardar l'usuari: ${err}`});

    res.status(200).send({ token: service.createToken(user) })
  });

};

/** Login d'un usuari */
authCtrl.login = (req, res) => {
  console.log(req.header)
  User.find({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).send({ message: err });
    if(!user) return res.status(404).send({ message: `No existeix l'usuari` });

    req.user = user;
    res.status(200).send({ token: service.createToken(user) })
  })
};

module.exports = authCtrl;