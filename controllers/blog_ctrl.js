'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
let blog ={};

blog.test = function (req, res) {
    res.send('blog testing')
}




module.exports = blog;
