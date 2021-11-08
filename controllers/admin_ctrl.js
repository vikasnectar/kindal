'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const user = db.admin;
const Op = db.Sequelize.Op;
const utility = require('../helpers/utility')
const Constant = require('../config/constant')
const mailer =  require('../lib/mailer')
let admin ={};



admin.userRegistration = async function (req, res) {

  try{
      let {first_name,last_name,email,password,gendar,city,phone,dob_date} = req.body;
      let userData = {
        first_name:first_name,
        last_name:last_name,
        email:email,
        password:password,
        repeat_password:password,
        gendar:gendar,
        city:city,
        phone:phone,
        dob_date:dob_date
      }

      let data = await utility.checkUserData(userData)
      if(data.message){
         return res.json({
            code:Constant.ERROR_CODE,
            massage:Constant.INVAILID_DATA,
            data:data.message
          })
      }else{
        userData.verification_token = utility.randomString(24);
        let result = await user.findAll({
          where:{
            email:email
          }
        })
        if(result.length>0){

          return res.json({
            code:Constant.FORBIDDEN_CODE,
            massage:Constant.EMAIL_ALREADY_REGISTERED,
            data:result.length
          })
        }else{

          userData.password = bcrypt.hashSync(password, salt);
          let result = await user.create(userData);
          let mailOptions ={
            from:'vikas <vikas.kushwah@nectarinfotel.com>',
            to:'vikashubh1990@gmail.com',
            subject:'asfasfasf',
            text:'this is as asdasdf',
            html:'<h1>this is as asdasdf<h1>link : http://localhost:3000/admin/emailVerification/'+userData.verification_token
        }
         await mailer.sendEmail(mailOptions)
          return res.json({
            code:Constant.SUCCESS_CODE,
            massage:Constant.USER_SAVE_SUCCESS,
            data:result
          })

        }
      }
    
  }
  catch (err) {

    return res.json({
      code:Constant.ERROR_CODE,
      massage:Constant.SOMETHING_WENT_WRONG,
      data:null
    })
    
  }

}


admin.userLogin = async (req,res)=>{
  try {
    let {userName,password} = req.body;
    let userData = {
      userName:userName,
      password:password
    }
    let data = await utility.userLogin(userData)
    
    if(data.message){
      return res.json({
         code:Constant.ERROR_CODE,
         massage:Constant.INVAILID_DATA,
         data:data.message
       })
   }else{
      let result = await user.findOne({
        where:{
          email:userName
        }
      })
      if(bcrypt.compareSync(password, result.password)){
        let params = {
          userId:result.id,
          first_name:result.first_name,
          last_name:result.last_name,
          email:result.email,
          gendar:result.gendar,
          city:result.city,
          phone:result.phone,
          dob_date:result.dob_date
        }
       params.jwtToken = jwt.sign(params, process.env.SECRET);

       require('../lib/mailer')
        return res.json({
          code:Constant.SUCCESS_CODE,
          massage:Constant.USER_LOGIN_SUCCESS,
          data:params
        })
      }else{
        return res.json({
          code:Constant.FORBIDDEN_CODE,
          massage:Constant.USER_EMAIL_PASSWORD,
          data:null
        })
        
      }
      

   }
  } catch (error) {
    return res.json({
      code:Constant.ERROR_CODE,
      massage:Constant.SOMETHING_WENT_WRONG,
      data:null
    })
  }
}

admin.emailVerification = async (req,res)=>{
try {
  let {token} = req.params;


  user.findOne({where: {
    verification_token: token
  }}).then(data=>{
    if(data){
      data.update({verification_token:'', status:true });

      return res.json({
        code: Constant.SUCCESS_CODE,
        data: null,
        message: Constant.EMAIL_VERIFIED
      });
    }else{

      return res.json({
        code: Constant.SUCCESS_CODE,
        data: data,
        message: Constant.INVALID_TOKEN
      });
    }
    

  })

} catch (error) {
 return res.json({
      code:Constant.ERROR_CODE,
      massage:Constant.SOMETHING_WENT_WRONG,
      data:null
    }) 
}
  
}

admin.forgotPassword = async (req,res)=>{
 try {
   let {email} = req.body;
  user.findOne({
    where:{
      email:email
    }
  }).then(async (result)=>{
    if(result){
      var Token = await utility.gerrateToken(20);
      let resetPasswordExpires = Date.now() + 3600000;
        var UserData = {
          verification_token: Token,
          resetPasswordExpires: resetPasswordExpires, // 1 hour
        }

      result.update(UserData);

          let mailOptions ={
            from:'vikas <vikas.kushwah@nectarinfotel.com>',
            to:'vikashubh1990@gmail.com',
            subject:'asfasfasf',
            text:'this is as asdasdf',
            html:'<h1>this is as asdasdf<h1>link : http://localhost:3000/admin/emailVerification/'+ Token
        }
         await mailer.sendEmail(mailOptions)

      return  res.json({
        code: Constant.SUCCESS_CODE,
        message: Constant.SENT_FORGOT_EMAIL,
        data: null
    });
    }else{

      return res.json({
        code: Constant.ERROR_CODE,
        data: null,
        message: Constant.USER_EMAIL_NOT_REGISTERED
    })
  }
  
})


 } catch (error) {
  return res.json({
    code:Constant.ERROR_CODE,
    massage:Constant.SOMETHING_WENT_WRONG,
    data:null
  }) 
 }
}

admin.resetPassword = async (req,res)=>{
try {
  let {token,password} = req.body;
 
  user.findOne({
    where:{
      verification_token:token
    }
  }).then((result)=>{
    if (result && result.resetPasswordExpires >= Date.now()) {
      var hash = bcrypt.hashSync(password, salt);
      var UserData = {
        password: hash,
        verification_token: '',
        resetPasswordExpires: '',
      }

    result.update(UserData);
      return  res.json({
          code: Constant.SUCCESS_CODE,
          'message': Constant.PASSWORD_RESET,
          data: result.email
      });

    }else{
      return res.json({
        code:Constant.ERROR_CODE,
        massage:Constant.USER_RESET_PASSWORD,
        data:null
      }) 
    }

  })
} catch (error) {
  return res.json({
    code:Constant.ERROR_CODE,
    massage:Constant.USER_RESET_PASSWORD,
    data:null
  }) 
}



}

module.exports = admin;
