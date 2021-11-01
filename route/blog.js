var express = require('express')
var router = express.Router()
var blog = require('../controllers/blog_ctrl') 
// define the home page route
router.get('/', blog.test);


module.exports = router