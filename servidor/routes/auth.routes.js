const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
const auth = jwt({secret: 'PROJECTE_FINAL', userProperty: 'payload'});

const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/profile', auth, authCtrl.profileRead);
router.get('/usersAll', authCtrl.totsUsuaris);

module.exports = router;