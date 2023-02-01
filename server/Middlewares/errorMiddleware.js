const errorMiddleware = (error, req, res, next)=>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal server error!";

    if(error.name === "CastError"){
        error.statusCode = 400;
        error.message = `The give URL ID is Invalid, ${error.path} not Found `;
    }

    return res.status(error.statusCode).json({
        success : false,
        message : error.message
    })

}

module.exports = errorMiddleware;