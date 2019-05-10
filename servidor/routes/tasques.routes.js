const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
const config = require('../config/config');
const isAuth = require('../middelwares/auth');

const tascaCtrl = require('../controllers/tasca.controller');

router.get('/', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.getAll);
router.post('/', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.novaTasca);
router.delete('/:id', jwt({secret: config.SECRET_TOKEN}), isAuth, tascaCtrl.esborrarTasca);

module.exports = router;