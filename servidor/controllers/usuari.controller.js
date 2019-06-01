const mongoose = require("mongoose");
const User = require('../models/usuari');
const service = require('../services/services');

const authCtrl = {};

/** Registre d'un usuari */
authCtrl.register = async (req, res) => {
  console.log(req.body.contrasenya)
  const pass = await service.encodePassowrd(req.body.contrasenya);

  if(!pass || pass === undefined || pass ===  null) return res.status(500).send({message: `Error al codificar la password`})
  
  const user = new User({ email: req.body.email, contrasenya: pass })

  user.save((err) => {
    if(err) res.status(500).send({message: `s'ha produït un error al guardar l'usuari: ${err}`});

    res.status(200).send({ token: service.createToken(user) })
  });

};

/** Login d'un usuari */
authCtrl.login = async (req, res) => {
   
  const user = await User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).send({ message: err });
    if(!user) return res.status(404).send({ message: `No existeix l'usuari` });
    
    return user
  })

  const correcte = await service.decodePassowrd(req.body.contrasenya, user.contrasenya);  
  if(!correcte) return res.status(401).send({message: "Contrasenya no valida"})
  
  req.user = user;
  res.status(200).send({ token: service.createToken(user) })
};

/** Dades d'un usuari */
authCtrl.dadesUsuari = (req, res) => {
  User.findOne({_id: req.user.sub}, 'email', (err, user) => {
    if(err) return res.status(500).send({ message: err });
    if(!user) return res.status(404).send({ message: `No existeix l'usuari` });

    res.status(200).send(user)
  })
}
/** BORRAR TOTA LA BD (DEV NOMÉS) */
/*
const Tasca = require('../models/tasca')
const Etiqueta = require('../models/etiqueta')

authCtrl.borrarTot = async (req, res) => {
  await User.remove({}, (err) => {
    if(err) return res.status(500).send({message: `Error al borrar tots els Usuari`})
  })

  await Tasca.remove({}, (err) => {
    if(err) return res.status(500).send({message: `Error al borrar les Tascques`})
  })

  await Etiqueta.remove({}, (err) => {
    if(err) return res.status(500).send({message: `Error al borrar les Etiquetes`})
  })

  res.status(200).send({message: `S'HA BORRAT TOT AMB EXIT`})
}
*/


module.exports = authCtrl;