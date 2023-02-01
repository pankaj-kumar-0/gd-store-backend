const AsyncHandler = (handler) => async (req, res, next )=>{
    try {
        await handler(req, res ,next)
    } catch (error) {
        return next(error)
    }
}

module.exports = AsyncHandler