const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "Please enter your name"],
        maxlength : [25, "The name length can not go upto 25 characters"],
        minLength: [3, "The name length should be more than 3 characters"],
        trim : true,
    },
    email:{
        type : String,
        required : [true, "Please enter your email"],
        unique : [true, "This email is already used"],
        validate : [validator.isEmail , "Please enter a valid email"]
    },
    password:{
        type : String,
        required : [true, "Please enter the password"],
        minLength : [8 , "The password should be more than 8 character"]
    },
    isAdmin:{
        type : Boolean,
        default : false,
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
});


// hash password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
 });

 //  generate token 
 
userSchema.methods.generateJWT = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
         expiresIn:process.env.JWT_EXPIRE
        });
}

userSchema.methods.checkingPassword = async function(recivedPassword){
    return await bcrypt.compare(recivedPassword, this.password );
}



const userModel = mongoose.model('Users' ,userSchema);
module.exports = userModel;