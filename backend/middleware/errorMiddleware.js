const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    //Sometimes we might get a 200 response, even though it's an error. So if res.statusCode = 200, 
    //then make it 500. 500 means a server error
    //Bcz we are inside a route, I want to be able to set a status code before we throw an error

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }