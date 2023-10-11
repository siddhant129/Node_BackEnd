const mongoose = require('mongoose')
const OrderItem = require('../Models/orderItems')
const Users = require('../Models/user')

const ordersSchema = mongoose.Schema({
    id : {
        type: String
    },
    orderItems : [{
        type : mongoose.Schema.ObjectId,
        ref : 'OrderItem',
        required : true
    }],
    shippingAddress1 : {
        type : String,
        required : true
    },
    shippingAddress2 : {
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : 'Pending'
    },
    totalPrice : {
        type : Number
    },
    user :{
        type : mongoose.Schema.ObjectId,
        ref : 'Users',
        required :true
    },
    dateOrdered : {
        type: Date,
        default : Date.now
    }
})

// ordersSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// })

// ordersSchema.set('toJSON',{
//     virtuals : true,
// })

exports.Orders = mongoose.model('Orders',ordersSchema)