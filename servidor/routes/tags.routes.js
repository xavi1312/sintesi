const express = require('express');
const router  = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'PROJECTE_FINAL', userProperty: 'payload'});

const tagCtrl = require('../controllers/tag.controller');

router.get('/', tagCtrl.getAll);
/*router.get('/id=:id', tagCtrl.getTag);
router.post('/', tagCtrl.createTag);
router.put('/id=:id', tagCtrl.updateTag);*/

module.exports = router;