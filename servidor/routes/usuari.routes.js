const express = require('express');
const router  = express.Router();

const authCtrl = require('../controllers/usuari.controller');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
//router.get('/profile', authCtrl.profileRead);
router.get('/BORRAR', authCtrl.borrarTot);

module.exports = router;