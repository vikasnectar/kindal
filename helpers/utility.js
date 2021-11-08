const Joi = require('joi');
const crypto = require("crypto");

var utility = {};
utility.randomString = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}


utility.gerrateToken = (length) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, function (err, buf) {
            if (err) {
                reject(err);
            } else {
                resolve(buf.toString('hex'))
            }


        });
    })

}

utility.fileupload = (files) => {
    return new Promise((resolve, reject) => {
        var filedata = files.image.mv(__dirname + '/' + files.image.name, (error, data) => {
            if (error) {
                reject(null);
            } else {
                resolve(files.image.name);
            }
        })

    })

}

utility.gerrateSlug = (title,table)=>{
    
    return new Promise(async (resolve,reject)=>{
            var data = title.toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
            var result =  await table.findAll({
                where:{
                 slug: data  
                }
            })
            if(result.length>0){
                resolve(data+'-'+result.length);
            }else{
                resolve(data);
            }
            
        
    })
}
module.exports = utility;