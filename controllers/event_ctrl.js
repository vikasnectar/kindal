'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
const utility = require('../helpers/utility');
const db = require("../models");
const Constant = require('../config/constant');
const blog = db.blog;
const event = db.event;
const admin = db.admin;
const { Op } = require("sequelize");
let events ={};



events.add = async (req,res)=>{
    try {
        let {name,name_en,date,time,description,description_en} = req.body;
        let {userId} = req.user;
        let  fileName='';
        if(req.files){
            fileName = await utility.fileupload(req.files)
        }

        let eventData ={
            name:name,
            name_en:name_en,
            date:date,
            time:time,
            description:description,
            description_en:description_en,
            image:fileName,
            userId:userId

        }
        let result = await event.create(eventData);
        if(result){
            let data = await event.findAll({})
    
            return res.json({
                code:Constant.SUCCESS_CODE,
                massage:Constant.EVENT_SAVE_SUCCESS,
                data:data
            })
        }else{
            return res.json({
                code:Constant.ERROR_CODE,
                massage:Constant.SOMETHING_WENT_WRONG,
                data:result
            })
        }
    } catch (error) {
        return res.json({
            code:Constant.ERROR_CODE,
            massage:Constant.SOMETHING_WENT_WRONG,
            data:null
        })
    }
}


events.edit = async (req,res)=>{
    try {
        let {id,name,name_en,date,time,description,description_en} = req.body;
        let {userId} = req.user;
        let  fileName='';
        if(req.files){
            fileName = await utility.fileupload(req.files)
        }

        let eventData ={
            name:name,
            name_en:name_en,
            date:date,
            time:time,
            description:description,
            description_en:description_en,
            image:fileName,
            userId:userId

        }
        event.findOne({
            where: {
                id: id
              }
          }).then(async (result)=>{
              if(result){
                    result.update(eventData)

                    return res.json({
                    code:Constant.SUCCESS_CODE,
                    massage:Constant.EVENT_UPDATED_SUCCESS,
                    data:result
                })

                }else{
                    return res.json({
                        code:Constant.ERROR_CODE,
                        massage:Constant.SOMETHING_WENT_WRONG,
                        data:result
                    })
                }

          }).catch(error=>{
            return res.json({
                code:Constant.ERROR_CODE,
                massage:Constant.SOMETHING_WENT_WRONG,
                data:error
            })
          })
    } catch (error) {
        return res.json({
            code:Constant.ERROR_CODE,
            massage:Constant.SOMETHING_WENT_WRONG,
            data:null
        })
    }
}

events.getAllEvents = async (req,res)=>{
    try {
        event.findAll({
            where:{
                status:1
            }
        }).then(result =>{
            return res.json({
                code:Constant.SUCCESS_CODE,
                massage:Constant.EVENT_RETRIEVE_SUCCESS,
                data:result
            })
        }).catch(error =>{
            return res.json({
                code:Constant.ERROR_CODE,
                massage:Constant.SOMETHING_WENT_WRONG,
                data:null
            })
        })
    } catch (error) {
        return res.json({
            code:Constant.ERROR_CODE,
            massage:Constant.SOMETHING_WENT_WRONG,
            data:null
        })
    }
    
    }

    events.getEventsByUserId = async (req,res)=>{
        try {
            let {userId} = req.body;
            admin.findAll({
                where:{
                    id:userId
                },
                include:[event]
            }).then(result =>{
                return res.json({
                    code:Constant.SUCCESS_CODE,
                    massage:Constant.EVENT_RETRIEVE_SUCCESS,
                    data:result
                })
            }).catch(error =>{
                return res.json({
                    code:Constant.ERROR_CODE,
                    massage:Constant.SOMETHING_WENT_WRONG,
                    data:null
                })
            })
        } catch (error) {
            return res.json({
                code:Constant.ERROR_CODE,
                massage:Constant.SOMETHING_WENT_WRONG,
                data:null
            })
        }
        
    }

events.delete = async (req, res)=>{
    try {
        
        let {id} = req.body;

        event.findOne({
            where: {
                id: id
              }
          }).then(async (result)=>{
              if(result){
                let evetData = {
                    status:0
            
                }
                result.update(evetData)

                return res.json({
                    code:Constant.SUCCESS_CODE,
                    massage:Constant.Event_DELETED_SUCCESS,
                    data:result
                })

              }else{
                return res.json({
                    code:Constant.ERROR_CODE,
                    massage:Constant.SOMETHING_WENT_WRONG,
                    data:result
                })
              }

          }).catch(error=>{
            return res.json({
                code:Constant.ERROR_CODE,
                massage:Constant.SOMETHING_WENT_WRONG,
                data:error
            })
          })
 
    } catch (error) {
        return res.json({
            code:Constant.ERROR_CODE,
            massage:Constant.SOMETHING_WENT_WRONG,
            data:error
        })
    }

}

module.exports = events;
