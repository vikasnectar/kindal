'use strict'
let admin ={};

admin.test = function (req, res) {
    res.send('<h1>testing admin controller</h1>')
}



module.exports = admin;
