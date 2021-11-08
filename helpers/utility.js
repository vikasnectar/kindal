const Joi = require('joi');
const crypto = require("crypto");

var utility = {};

utility.checkUserData = async (data)=>{
    const schema = Joi.object({
        first_name: Joi.string()
                   .required(),
        last_name: Joi.string()
                   .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        gendar:Joi.string().required(),
        
        city:Joi.string()
                .required(),
        phone:Joi.number(),

        repeat_password: Joi.ref('password'),
        
        dob_date: Joi.string().required(),

        email: Joi.string()
            .email()
            .required()
    }).with('last_name','first_name')
      .with('last_name','first_name')
      .with('gendar', 'dob_date');
    
    try {
     
        const value = await schema.validateAsync(data);
        return value;
    }
    catch (err) { 
        return err;
    }
}


utility.userLogin = async (data)=>{
    const schema = Joi.object({
        password: Joi.string().required(),
        userName: Joi.string()
            .email()
            .required()
    })
      .with('password', 'userName');
    
    try {
     
        const value = await schema.validateAsync(data);
        return value;
    }
    catch (err) { 
        return err;
    }
}

utility.randomString = (length)=> {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}


utility.gerrateToken = (length)=>{
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(length, function (err, buf) {
            if (err) {
                reject(err);
            }else{
                resolve(buf.toString('hex'))
            }
            
          
        });
    })

}

utility.fileupload = (files)=>{
 return new Promise((resolve,reject)=>{
    var filedata =   files.image.mv(__dirname+ '/' +files.image.name,(error,data)=>{
        if(error){
          reject(null);
        }else{
            resolve(files.image.name);
        }
    })

 })

}


module.exports = utility;