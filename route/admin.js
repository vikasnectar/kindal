var express = require('express')
var router = express.Router()
var admin = require('../controllers/admin_ctrl') 
// define the home page route
router.get('/', admin.test);


module.exports = router