'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
const db = require("../models");
const user = db.admin;
const Op = db.Sequelize.Op;
let admin ={};

admin.test = async function (req, res) {

    const data = {
        first_name: 'asfasfasfsaf',
        last_name: 'asfsafasfasf',
        user_name: '45as4f5sa4f',
        email:"email@gmail.com",
        password:"12345"
      };

     let result = await user.create(data);
     res.json(result)
}




module.exports = admin;
