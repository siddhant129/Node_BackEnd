const express = require('express');
const routers = express.Router()
const {Orders} = require('../Models/orders')

routers.get('/',async (req,res)=>{
    const orders = await Orders.find()
    if (!orders) {
        return res.status(200).json({success: false,Error : 'No orders are made yet'})
    } else {
        res.send(orders)
    }
})


module.exports = routers