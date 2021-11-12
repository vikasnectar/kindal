'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const user = db.admin;
const store = db.store;
const Op = db.Sequelize.Op;
const utility = require('../helpers/utility')
const validation = require('../helpers/validation')
const Constant = require('../config/constant')
const mailer = require('../lib/mailer')
let admin = {};



admin.userRegistration = async function (req, res) {

  try {

    let userData = await validation.checkUserData(req.body)
    if (userData.message) {
      return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.INVAILID_DATA,
        data: userData.message
      })
    } else {
      userData.verification_token = utility.randomString(24);
      let result = await user.findAll({
        where: {
          email: userData.email
        }
      })
      if (result.length > 0) {

        return res.json({
          code: Constant.FORBIDDEN_CODE,
          massage: Constant.EMAIL_ALREADY_REGISTERED,
          data: null
        })
      } else {

        userData.password = bcrypt.hashSync(userData.password, salt);
        let result = await user.create(userData);
        let mailOptions = {
          from: 'vikas <vikas.kushwah@nectarinfotel.com>',
          to: userData.email,
          subject: 'kindal',
          text: 'Email verification lik',
          html: '<h1>Email verification lik<h1>: http://localhost:3000/admin/emailVerification/' + userData.verification_token
        }
        await mailer.sendEmail(mailOptions)
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.USER_SAVE_SUCCESS,
          data: result
        })

      }
    }

  }
  catch (err) {

    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })

  }

}


admin.getUserByToken = async(req,res)=>{
    try {
      const SECRET = process.env.SECRET;
      const { authorization } = req.headers;
      const decoded = jwt.verify(authorization, SECRET);
      return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.USER_VERIFICATION_SUCCESS,
          data: decoded
        })
  } catch (error) {
      return res.json({
          code: Constant.FORBIDDEN_CODE,
          massage: Constant.INVALID_TOKEN,
          data: null
      })
  }
}
admin.userLogin = async (req, res) => {
  try {
    let { userName, password } = req.body;
    let userData = {
      userName: userName,
      password: password
    }
    let data = await validation.userLogin(userData)

    if (data.message) {
      return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.INVAILID_DATA,
        data: data.message
      })
    } else {
      let result = await user.findOne({
        where: {
          email: userName
        }
      })
      if (bcrypt.compareSync(password, result.password)) {
        let params = {
          userId: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          gendar: result.gendar,
          city: result.city,
          phone: result.phone,
          dob_date: result.dob_date
        }
        params.jwtToken = jwt.sign(params, process.env.SECRET);
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.USER_LOGIN_SUCCESS,
          data: params
        })
      } else {
        return res.json({
          code: Constant.FORBIDDEN_CODE,
          massage: Constant.USER_EMAIL_PASSWORD,
          data: null
        })

      }


    }
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })
  }
}

admin.emailVerification = async (req, res) => {
  try {
    let { token } = req.params;


    user.findOne({
      where: {
        verification_token: token
      }
    }).then(data => {
      if (data) {
        data.update({ verification_token: '', status: true });

        return res.json({
          code: Constant.SUCCESS_CODE,
          data: null,
          message: Constant.EMAIL_VERIFIED
        });
      } else {

        return res.json({
          code: Constant.SUCCESS_CODE,
          data: data,
          message: Constant.INVALID_TOKEN
        });
      }


    })

  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })
  }

}

admin.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    user.findOne({
      where: {
        email: email
      }
    }).then(async (result) => {
      if (result) {
        var Token = await utility.generateToken(20);
        let resetPasswordExpires = Date.now() + 3600000;
        var UserData = {
          verification_token: Token,
          resetPasswordExpires: resetPasswordExpires, // 1 hour
        }

        result.update(UserData);

        let mailOptions = {
          from: 'vikas <vikas.kushwah@nectarinfotel.com>',
          to: email,
          subject: 'Forgot password',
          text: '',
          html: '<h1>Forgot password<h1>link : http://localhost:3000/admin/emailVerification/' + Token
        }

        await mailer.sendEmail(mailOptions)

        return res.json({
          code: Constant.SUCCESS_CODE,
          message: Constant.SENT_FORGOT_EMAIL,
          data: null
        });
      } else {

        return res.json({
          code: Constant.ERROR_CODE,
          data: null,
          message: Constant.USER_EMAIL_NOT_REGISTERED
        })
      }

    })


  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })
  }
}

admin.resetPassword = async (req, res) => {
  try {
    let { token, password } = req.body;

    user.findOne({
      where: {
        verification_token: token
      }
    }).then((result) => {
      if (result && result.resetPasswordExpires >= Date.now()) {
        var hash = bcrypt.hashSync(password, salt);
        var UserData = {
          password: hash,
          verification_token: '',
          resetPasswordExpires: '',
        }

        result.update(UserData);
        return res.json({
          code: Constant.SUCCESS_CODE,
          'message': Constant.PASSWORD_RESET,
          data: result.email
        });

      } else {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.USER_RESET_PASSWORD,
          data: null
        })
      }

    })
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.USER_RESET_PASSWORD,
      data: null
    })
  }



}

admin.changePassword = async (req, res) => {
  try {
    let { oldPassword, password } = req.body;
    let {email} =  req.user;

    user.findOne({
      where: {
        email:email
      }
    }).then((result) => {
      if (result && (bcrypt.compareSync(oldPassword, result.password))) {
        var hash = bcrypt.hashSync(password, salt);
        var UserData = {
          password: hash
        }

        result.update(UserData);
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.PASSWORD_RESET,
          data: null
        });

      } else {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.USER_OLD_PASSWORD,
          data: null
        })
      }

    })
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.USER_RESET_PASSWORD,
      data: null
    })
  }
}


admin.addConsignee = async function (req, res) {

  try {

          let {first_name,last_name,email} = req.body;
          let userData = {
              first_name:first_name,
              last_name:last_name,
              email:email,
              role:3,
              status:1
          }
      userData.password = utility.randomString(8);
      let result = await user.findAll({
        where: {
          email: userData.email
        }
      })
      if (result.length > 0) {

        return res.json({
          code: Constant.FORBIDDEN_CODE,
          massage: Constant.EMAIL_ALREADY_REGISTERED,
          data: null
        })
      } else {

        userData.password = bcrypt.hashSync(userData.password, salt);
        let result = await user.create(userData);
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.USER_SAVE_SUCCESS,
          data: {id:result.id}
        })

      }

  }
  catch (err) {

    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })

  }

}


admin.getAllConsignee = async function (req, res) {

  try {
        let result = await user.findAll({
          where: {
            role:3
          },
          attributes:["id","first_name","last_name"]
        })

        let massage =  (result.length>0)?Constant.CONSIGNEE_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })

  }
  catch (err) {

    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })

  }

}

module.exports = admin;
