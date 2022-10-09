const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const authMiddleware = asyncHandler( async (req, res, next) => {
    let token;
    
    // check to see if there is a req, then check for headers, then authorization, then looking for bearer: Optional chaining
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        // Split by the space, taking the second index
        token = req?.headers?.authorization?.split(' ')[1]
        try {
            if(token) {
                // Decode the token
                const decodedUser = jwt.verify(token, process.env.JWT_KEY)

                // find user
                const user = await User.findById(decodedUser?.id)

                // Attach the user to the request object
                req.user = user

                // Move on
                next()
            }
        } catch (error) {
            throw new Error('Not Authorized: Token Expired')
        }
    }else {

        // Token is expired
        throw new Error('There is no token attached to the header')
    }

})


module.exports = {
    authMiddleware
}