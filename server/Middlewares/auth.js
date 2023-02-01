const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const ErrorHandler = require("../Utils/errorHandler");
const AsyncHandler = require("./asyncHandler");

const AuthenticatedUser = AsyncHandler( async(req, res, next)=>{

    const {token} = req.cookies;

    // console.log(token);
    if(!token){
       return  next( new ErrorHandler("Please login First to access this source", 401))
    }

    encodedData = jwt.verify(token , process.env.JWT_SECRET_KEY);

    // console.log(encodedData);

    req.user = await User.findById(encodedData.id);
    next()

} );

const AdminCheck = (role) => AsyncHandler( (req, res, next)=>{
    const user_role = req.user.isAdmin;

    if(role != user_role){
        return next(new ErrorHandler( "User Can not access this resource" ,401 ))
    }

    next()
} )


module.exports = {AuthenticatedUser ,AdminCheck};