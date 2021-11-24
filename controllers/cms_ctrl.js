const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const cms = db.cms;
const Op = db.Sequelize.Op;
const Constant = require('../config/constant')
const utility = require('../helpers/utility')
let cmsfunc ={};
cmsfunc.add = async (req,res)=>{
    try {
        let {title , image,} = req.body; 
        let cmsData = {
            title:title
        }
        let result = await cms.create(cmsData);
        if (image) {
            image = await utility.uploadBase64Image(image)
        
         let userData = {
            image: image  
            }
            result.update(userData)
        }
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.SLIDE_SAVE_SUCCESS,
            data: result
          }) 
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
          })      
    }
    
}


cmsfunc.edit = async (req,res)=>{
    try {
        let {title , image,id} = req.body; 
        let cmsData = {
            title:title
        }
        cms.findOne({
            where: {
              id:id
            }
          }).then(async (result) => {
            if (image) {
                image = await utility.uploadBase64Image(image)
            
             let cmsData = {
                image: image,
                title:title
                }
                result.update(cmsData)
            }else{
                let cmsData = {
                    title:title
                }
                result.update(cmsData)  
            }
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_SAVE_SUCCESS,
                data: result
              })
          }).catch(error =>{
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
              })
          })
        
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
          })      
    }
    
}


cmsfunc.deletecms = async (req,res)=>{
    try {
  
      let { id } = req.body;
  
      cms.findOne({
          where: {
              id: id
          }
      }).then(async (result) => {
          if (result) {
              let cmsData = {
                  status: 0
  
              }
              result.update(cmsData)
  
              return res.json({
                  code: Constant.SUCCESS_CODE,
                  massage: Constant.SLIDE_DELETED_SUCCESS,
                  data: result
              })
  
          } else {
              return res.json({
                  code: Constant.ERROR_CODE,
                  massage: Constant.SOMETHING_WENT_WRONG,
                  data: result
              })
          }
  
      }).catch(error => {
          return res.json({
              code: Constant.ERROR_CODE,
              massage: Constant.SOMETHING_WENT_WRONG,
              data: error
          })
      })
  
  } catch (error) {
      return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error
      })
  }
  }

  module.exports = cmsfunc;