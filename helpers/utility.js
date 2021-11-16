const Joi = require('joi');
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
var utility = {};
utility.randomString = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}


utility.generateToken = (length) => {
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

utility.generateSlug = (title,table)=>{
    
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

utility.checkTagAndCreate = (tags,bookId,book_tag,tag_relationship) => {

    return new Promise(async (resolve,reject)=>{
        tags = tags.split(",");
        tags.forEach( tag =>{
            var slug = tag.toLowerCase()
                .replace(/ /g,'-')
                .replace(/[^\w-]+/g,'');
    
          book_tag.findOne({
                where:{
                    slug:slug
                }
            }).then(result=>{
                   if(!result){
                        let tagData = {
                            slug:slug,
                            name:tag
                        }
                        book_tag.create(tagData).then(t_result=>{
                            let relationship = {
                                bookId:bookId,
                                tagId:t_result.id
                            }
                            tag_relationship.destroy({
                                where :{
                                    bookId:bookId  
                                }
                            }).then(data=>{
                                tag_relationship.create(relationship).then(r_result=>{
                                    resolve(r_result)
                                }).catch(error=>{
                                    reject(error)
                                })
                            }).catch(error=>{
                                reject(error)
                            })
                            
                            
                        })
                   }else{
                        let relationship = {
                            bookId:bookId,
                            tagId:result.id
                        }
                        tag_relationship.destroy({
                            where :{
                                bookId:bookId  
                            }
                        }).then(data =>{
                            tag_relationship.create(relationship).then(r_result=>{                            
                                resolve(r_result)
                            }).catch(error=>{
                                reject(error)
                            })
                        }).catch(error=>{
                            reject(error)
                        })
                       
                   }
            })
        
          
        })
    })  
}

utility.uploadBase64Image = async (imgBase64)=>{
    let name = await utility.randomString(12);
    let filename = 'img_'+ name +'.png';

    let file_path = 'C:\\Users\\acer\\Documents\\images';

    var base64Data = imgBase64.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(file_path+"/"+filename, base64Data, 'base64', function(err) {
    console.log(err);
    });
    return filename;
}
module.exports = utility;