const jwt = require('jsonwebtoken')


// Generate a token taking id of user as parameter
const generateToken = id => {
    // Signing out token using the user's id as well as our private key
    return jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: "30d"
    })
}

module.exports = {
    generateToken
}