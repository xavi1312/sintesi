const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
const isAuth = require('../middelwares/auth');
const config = require('../config/config');
const authCtrl = require('../controllers/usuari.controller');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/dadesUsuari', jwt({secret: config.SECRET_TOKEN}), isAuth, authCtrl.dadesUsuari);
router.get('/BORRAR', authCtrl.borrarTot);

module.exports = router;