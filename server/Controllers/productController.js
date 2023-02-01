const AsyncHandler = require('../Middlewares/asyncHandler');
const Product = require('../Models/productModel');
const APIfeatures = require('../Utils/apiFeatures');
const ErrorHandler = require('../Utils/errorHandler');

// Create product api == admin
exports.create_product = AsyncHandler( async (req, res)=>{
    req.body.user = req.user._id;
    
    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        message: "Product created succesfully",
        product
    })
})

// Get all product 

exports.all_products = AsyncHandler( async(req, res ,next)=>{
    // return next( new ErrorHandler("this is the temp error",404))
    const all_product = await Product.countDocuments()
    
    const features = new APIfeatures( Product.find() , req.query ).searching().filtering().pagination()

    const products = await features.query;

    if(products.length === 0){
        return next( new ErrorHandler("Not any products found" , 404) )
    }

    res.status(200).json({
        success:true,
        all_product,
        products,
    });
});



// Get single product
exports.single_product = AsyncHandler( async(req, res , next)=>{
    const product = await Product.findById(req.params.id);
    if (!product){
        return next( new ErrorHandler("The product is not found" ,404 ) )
    }

    res.status(200).json({
            success :true,
            product
    })
} )



// Update product == admin
exports.update_product = AsyncHandler( async (req, res ,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next( new ErrorHandler("The Product is not found to update" ,404))
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body);

    res.status(200).json({
        success:true,
        message : "The product is updated successfully"
    })
})



// Delete product == admin
exports.delete_product = AsyncHandler( async(req, res , next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next( new ErrorHandler("The Product is not found to delete" ,404))
    }
     
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message : "The product is deleted successfully"
    })
});


// Add review or update 

exports.addReview = AsyncHandler( async (req, res ,next)=>{
    const product = await Product.findById(req.params.productId);
    if(!product){
        return next(new ErrorHandler("Product is not found to add the review"));
    }

    const {rating ,comment} = req.body;
    if(!rating || !comment){
        return next(new ErrorHandler("Please add the review and comment"));
    }


    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        // date: Date.now,
        comment
    }

    let AlreadyReviewd = product.reviews.find((item)=>
        item.user.toString()=== req.user._id.toString()
    )
    if(AlreadyReviewd){
        product.reviews.forEach((item)=>{
            if(item.user.toString()=== req.user._id.toString())
                (item.rating = rating), (item.comment = comment) 
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    var SumOfReview = 0 ;
    product.reviews.forEach( (item)=>{
        SumOfReview += item.rating;
    });

    const AverageRating = SumOfReview/product.reviews.length;

    product.ratings = AverageRating;
    await product.save();

    res.status(200).json({
        success : true,
        message : "Review added"
    })

})

