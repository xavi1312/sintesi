const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
const isAuth = require('../middelwares/auth');
const config = require('../config/config');

const etiquetaCtrl = require('../controllers/etiqueta.controller');

router.get('/', jwt({secret: config.SECRET_TOKEN}), isAuth, etiquetaCtrl.getAll);
router.get('/:idEtiqueta', jwt({secret: config.SECRET_TOKEN}), isAuth, etiquetaCtrl.unaEtiqueta);

router.post('/', jwt({secret: config.SECRET_TOKEN}), isAuth, etiquetaCtrl.novaEtiqueta);
router.put('/:idEtiqueta', jwt({secret: config.SECRET_TOKEN}), isAuth, etiquetaCtrl.actualitzarEtiqueta);
router.delete('/:idEtiqueta', jwt({secret: config.SECRET_TOKEN}), isAuth, etiquetaCtrl.esborrarEtiqueta);

module.exports = router;