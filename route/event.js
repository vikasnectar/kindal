var express = require('express')
var router = express.Router()
var event = require('../controllers/event_ctrl') 
// define the home page route
router.get('/', event.test);


module.exports = router