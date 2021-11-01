'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
let books ={};

books.test = function (req, res) {
    res.send('books testing')
}




module.exports = books;
