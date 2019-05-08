const express = require('express');
const router  = express.Router();
var jwt = require('express-jwt');

const tagCtrl = require('../controllers/tasca.controller');

router.get('/', tagCtrl.getAll);
/*router.get('/id=:id', tagCtrl.getTag);
router.post('/', tagCtrl.createTag);
router.put('/id=:id', tagCtrl.updateTag);*/

module.exports = router;