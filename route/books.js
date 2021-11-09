var express = require('express')
var router = express.Router()
var book = require('../controllers/book_ctrl');
var middileware = require('../middileware')
// define the home page route
router.post('/addBookCategory', middileware.checkAuthentication, book.addBookCategory);
router.put('/editBookCategory', middileware.checkAuthentication, book.editBookCategory);
router.delete('/deleteBookCategory', middileware.checkAuthentication, book.deleteBookCategory);


module.exports = router