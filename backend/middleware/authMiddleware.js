import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //index [0] has 'Bearer' and index [1] has token, so used [1] in the below line
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log(decoded) prints (for some id) 
            // { id: '6120e8508e8e841284c82cbc', iat: 1630486297, exp: 1633078297 }
            //So we can get the user's id with decoded.id
            //We're going to put all the user's data except the password in this req.user, which now 
            //will have access to in all of our protected routes
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }