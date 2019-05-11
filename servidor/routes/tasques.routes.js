const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
const config = require('../config/config');
const isAuth = require('../middelwares/auth');

const tascaCtrl = require('../controllers/tasca.controller');

router.get('/', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.getAll);
router.get('/:idTasca', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.unaTasca);

router.post('/', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.novaTasca);
router.put('/:idTasca', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.sobreEscriureTasca);
router.delete('/:idTasca', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.esborrarTasca);

module.exports = router;