var express = require('express')
var router = express.Router()
var book = require('../controllers/book_ctrl')
// define the home page route
router.get('/', book.test);


module.exports = router