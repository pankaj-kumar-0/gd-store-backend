const AsyncHandler = require('../Middlewares/asyncHandler');
const User = require('../Models/userModel');
const ErrorHandler = require('../Utils/errorHandler');
const sendToken = require('../Utils/tokenJWT');


// Signup 
exports.signUp = AsyncHandler(  async(req, res ,next) =>{
    let {name , email, password } = req.body;
    
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new ErrorHandler("Please enter a unique email", 400))
    }

    const user = await User.create({name,email, password});
    
    sendToken(201, res, user);

})




// Login
exports.logIn = AsyncHandler( async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password ){
        return next( new ErrorHandler("Please enter email and password", 400) )
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next( new ErrorHandler("Please enter valid email and password" , 401))
    }

    matchingPassword = await user.checkingPassword(password);

    if(!matchingPassword){
        return next( new ErrorHandler("Please enter valid email and password" ,401))
    }

    sendToken(200, res, user);
 
});
    




// Logout 
exports.Logout = AsyncHandler( (req ,res ,next)=>{

    const token_options = {
        expires : new Date(Date.now()),
        httpOnly : true
    }
    
    res.status(200).cookie('token', null ,token_options).json({
        success : true ,
        message : "LoggedOut successfully",
    })
} );




// Get user detail 
exports.getUserDetail = AsyncHandler( async(req, res, next)=>{
    const user = req.user;
    if(!user){
        return next( new ErrorHandler("The User is not found!", 404) );
    }
    res.status(200).json({
        success : true,
        user
    })
});




// Update user profile 
exports.updateUser = AsyncHandler( async( req, res,next)=>{

    if(req.user){
        req.user.name = req.body.name || req.user.name ;
        req.user.email = req.body.email || req.user.email ;
        if(req.body.password){
            req.user.password = req.body.password
        }

        await req.user.save(); 
        res.status(200).json({
            success : true,
            message : "Profile updated successfully",
            user: req.user
        })

    }else{
        return next( new ErrorHandler("The User is not found!", 404))
    }
    
} );




// Get all user === Admin
exports.getAllUser = AsyncHandler( async(req, res ,next)=>{
    const users = await User.find();

    res.status(200).json({
        success : true ,
        users
    });
});




// Get single user === Admin
exports.singleUser = AsyncHandler( async(req, res , next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next( new ErrorHandler("The User dose not found!"), 404)
    }

    res.status(200).json({
        success : true,
        user
    }); 
});




// delete User === Admin 
exports.deleteUser = AsyncHandler( async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("The user does not found!" , 404))
    }
    await user.deleteOne();
    res.status(200).json({
        success : true,
        message : "The User is deleted successfully!"
    })
} )

// Update user role

exports.updateUserRole = AsyncHandler( async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("The user does not found!" , 404))
    }

    const {isAdmin} = req.body;
    if(!isAdmin){
        return next(new ErrorHandler("Please Enter the user role to update" , 404))
    }

    const update_value = await User.findByIdAndUpdate(user._id, { isAdmin : req.body.isAdmin} ,{new: true,upsert: true,});

    res.status(200).json({
        success: true,
        message : "User role updated successfully",
        update_value
    })
})

