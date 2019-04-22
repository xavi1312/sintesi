const express = require('express');
const router  = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'PROJECTE_FINAL', userProperty: 'payload'});

const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.register);
router.post('/login', auth, authCtrl.login);
router.get('/profile', auth, authCtrl.profileRead);

module.exports = router;