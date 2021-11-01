'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
let event ={};

event.test = function (req, res) {
    res.send('event testing')
}




module.exports = event;
