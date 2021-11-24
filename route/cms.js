var express = require('express')
var router = express.Router()
var middileware = require('../middileware')
var cms = require('../controllers/cms_ctrl')

router.post('/add',middileware.checkAuthentication,cms.add)

router.put('/edit',middileware.checkAuthentication,cms.edit)

router.delete('/delete',middileware.checkAuthentication,cms.deletecms)

module.exports = router