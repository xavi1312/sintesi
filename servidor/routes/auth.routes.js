const express = require('express');
const router  = express.Router();

const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.register );
router.post('/login', authCtrl.login);
router.get('/userid', authCtrl.userID);

module.exports = router;