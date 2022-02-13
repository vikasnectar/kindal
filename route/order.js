const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const order = require('../controllers/order_ctrl')

router.post('/createorder',order.createOrder)
router.put('/updateorder',order.updateOrder)
router.get('/getallorders',middileware.checkAuthentication,order.getAllOrders)
router.get('/getOrderByUserId',middileware.checkAuthentication,order.getOrderByUserId)
router.get('/getOrderByAuthorId',middileware.checkAuthentication,order.getOrderByAuthorId)


module.exports =  router;