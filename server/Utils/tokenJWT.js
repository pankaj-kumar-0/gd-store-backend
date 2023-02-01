const sendToken = ( statusCode ,res , user)=>{
    const token = user.generateJWT();

    const cookie_options = {
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    }

    res.status(statusCode).cookie( "token", token ,cookie_options ).json({
        success : true,
        token,
        user
    })

}

module.exports = sendToken;