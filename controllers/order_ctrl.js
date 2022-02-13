'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const utility = require('../helpers/utility');
const book_category = db.book_category;
const { Op, sequelize } = require("sequelize");
const { required } = require('joi');
const book = db.books;
const order = db.order;
const orderdetails = db.orderdetails;
const moment = require('moment');
let orders = {};

orders.createOrder = async (req,res)=>{

   try {
    let payload = req.body;
    let result = await order.create(payload);
    if(result){
        payload.orderId = result.id;
        let resultdata = await orderdetails.create(payload);
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.ORDER_SAVE_SUCCESS,
            data: result
        })
    }

   } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result
        })
   }
}


orders.updateOrder = async (req,res)=>{
    try {
     let {orderId,orderstatus} = req.body;
     order.findOne({
        where: {
          id: orderId
        }
      }).then((result) => {
        if(result){
            let orderData = {
                orderStatus: orderstatus
              }
              result.update(orderData);

            return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.ORDER_STATUS_UPDATED_SUCCESS,
            data: result
            });
        }else{
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.ORDER_STATUS_UPDATED_SUCCESS,
                data: null
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

 orders.getAllOrders = async (req,res)=>{
  try {
      order.findAll().then((result)=>{
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.ORDER_RETRIEVE_SUCCESS,
            data: result
            });
      })
  } catch (error) {
    return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: null
    })
  }
 }


 orders.getOrderByUserId = async (req,res)=>{
    try {
        let { userId } = req.user;
        let { fromdate,todate } = req.body;
        let condition = {};
        if(fromdate){
            condition = {
                userId: userId,
                createdAt: {
                    [Op.and]: {
                        [Op.gte]: fromdate,
                        [Op.lte]: todate
                    }
                }

            }
        }else{
            condition = {
                userId: userId
            }
        }
        order.findAll({
            where: condition,
        }).then((result)=>{
          return res.json({
              code: Constant.SUCCESS_CODE,
              massage: Constant.ORDER_RETRIEVE_SUCCESS,
              data: result
              });
        })
    } catch (error) {
      return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: null
      })
    }
   }


   orders.getOrderByAuthorId = async (req,res)=>{
    try {
        let { userId } = req.user;
        let {fromdate,todate } = req.body;
        let condition = {};
        if(fromdate){
            condition = {
                author: userId,
                createdAt: {
                    [Op.and]: {
                        [Op.gte]: fromdate,
                        [Op.lte]: todate
                    }
                }

            }
        }else{
            condition = {
                author: userId
            }
        }
        order.findAll({
            where: condition,
        }).then((result)=>{
          return res.json({
              code: Constant.SUCCESS_CODE,
              massage: Constant.ORDER_RETRIEVE_SUCCESS,
              data: result
              });
        })
    } catch (error) {
      return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: null
      })
    }
}


 orders.getOrderByAuthorId = async (req,res)=>{
    try {
        let { userId } = req.user;
        let {fromdate,todate } = req.body;
        let condition = {};
        if(fromdate){
            condition = {
                author: userId,
                createdAt: {
                    [Op.and]: {
                        [Op.gte]: fromdate,
                        [Op.lte]: todate
                    }
                }

            }
        }else{
            condition = {
                author: userId
            }
        }
        order.findAll({
            where: condition,
        }).then((result)=>{
          return res.json({
              code: Constant.SUCCESS_CODE,
              massage: Constant.ORDER_RETRIEVE_SUCCESS,
              data: result
              });
        })
    } catch (error) {
      return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: null
      })
    }
}

module.exports = orders;