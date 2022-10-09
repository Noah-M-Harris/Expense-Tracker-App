const errorHandler = (err, req, res, next) => {
    // If we enter a status code, use that, if not put status code = 500 
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode)

    // if there is an error, use that message. If we are in production do not show stack, if we are in development etc show stack error
    res.json({message: err?.message, stack: process.env.NODE_ENV === 'production' ? null : err?.stack})
}

// 404 Not Found Erro Handler
const notFound = (req, res, next) => {
    // Throws error showing the not found path
    const error = new Error(`Not found: ${req?.originalUrl}`)
    res.status(404)
    next(error)
}

module.exports = {
    errorHandler, 
    notFound
}