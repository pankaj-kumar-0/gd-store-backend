const AsyncHandler = require("../Middlewares/asyncHandler");
const Order = require("../Models/ordermodel");
const ErrorHandler = require("../Utils/errorHandler");


// make order
exports.createOrder = AsyncHandler(async (req, res, next) => {
    const {
        orederItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const user = req.user._id;

    const order = await Order.create({orederItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, user});

    res.status(200).json({
        success: true,
        order
    });
});

// get all oder list
exports.allOrders = AsyncHandler( async(req, res ,next)=>{
    const user = req.user._id;
    const orders = await Order.find({user}).populate("user","name email");

    if(orders.length===0){
        return next( new ErrorHandler("Not any order found, please order something" ,404 ) )
    }
    res.status(200).json({
        success: true,
        total_order: orders.length,
        orders
    })
})



// get single order 
exports.singleOrder = AsyncHandler( async(req, res, next)=>{
    const user = req.user._id;
    const orderId = req.params.orderId;
    const order = await Order.find({user, _id:orderId}).populate("user","name email");

    if(order.length ===0){
        return next( new ErrorHandler("Not any order found with this order Id" ,404))
    }
    res.status(200).json({
        success: true,
        toatl : order.length,
        order
    })
})





// All Orders ==== Admin
exports.allOrdersAdmin = AsyncHandler( async(req, res ,next)=>{
    
    const orders = await Order.find().populate("user","name email");

    if(orders.length===0){
        return next( new ErrorHandler("Not any order found " ,404 ) )
    }
    res.status(200).json({
        success: true,
        total_order: orders.length,
        orders
    })
});

// single order === Admin 
exports.singleOrderAdmin = AsyncHandler( async(req, res, next)=>{

    const orderId = req.params.orderId;
    const order = await Order.find({_id:orderId}).populate("user","name email");

    if(order.length ===0){
        return next( new ErrorHandler("Not any order found with this order Id" ,404))
    }
    res.status(200).json({
        success: true,
        toatl : order.length,
        order
    })
});



// update order ==Admin
