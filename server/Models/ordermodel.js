const mongoose = require('mongoose');


const orderScheam = new mongoose.Schema({
    orederItems:[
        {
        name : { type: String, required: true },
        image : { type: String, required: true },
        quantity : { type: Number, required: true },
        price : { type: Number, required: true },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Products',
            required : true
        }
    },],

    shippingAddress:{
        address : { type: String, required: true },
        city : { type: String, required: true },
        pin : { type: Number, required: true },
        state : { type: String, required: true },
        contactNumber : { type: Number, required: true },
    },
    paymentMethod : { type: String, required: true },
    itemsPrice : { type: Number, required: true },
    taxPrice : { type: Number, required: true },
    shippingPrice : { type: Number, required: true },
    totalPrice : { type: Number, required: true },
    orderStatus: { type: String, required: true, default: "Processing"},
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now,},
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    }
});


const orderModel = mongoose.model('orders', orderScheam);

module.exports = orderModel;
