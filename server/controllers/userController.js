const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../middleware/generateToken')

// incomeInfo

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Destructuring what we are recieving: What user is sending
    const {email, firstName, lastName, password} = req?.body

    // Checking if user exists
    const userExists = await User.findOne({email})

    // Custom Error handler
    // Email already in use: Cannot register User
    if(userExists) throw new Error('User already exists')


    try {
        // Creating user in our MongoDB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })

        /* if(!user) {
            res.status(400) 
            throw new Error('Account could not be created. Please try again')
        } */

        // Everything is fine
        res.status(200).json(user)

    } catch (error) {
        res.json(error)
    }
})

// @desc    Fetch All users
// @route   GET /api/users/fetch
// @access  Private
const fetchUsers = asyncHandler (async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Login user
// @route   POST /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // When logging in, user will provide email and password
    const {email, password} = req?.body

    // Find user by email
    const foundUser = await User.findOne({email})

    // Check if the user inserted password matches
    if(foundUser && await (foundUser?.isPasswordMatch(password))) {
        res.json({
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin,
            token: generateToken(foundUser?._id)
        })
    } else {
        // User input (either password or email) is incorrect
        res.status(401)
        throw new Error('Invalid login credentials')
    }

})


// @desc    User Profile
// @route   GET /api/users
// @access  Private
const userProfile = asyncHandler( async(req, res) => {
    const {_id} = req?.user
    try {
       // Grab user through our protected middleware & get user's expenses & income reports
        const profile = await User.findById(_id).populate(['expenses', 'income'])
    res.json(profile)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Update User Profile
// @route   PUT /api/users
// @access  Private
const updateUserProfile = asyncHandler( async(req, res) => {
    const {_id} = req.user
    try {
       // Grab user through our protected middleware, updating possible fields
    const profile = await User.findByIdAndUpdate(_id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email
    }, {
        new: true,
        runValidators: true
    }) 
    res.json(profile)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {
    registerUser,
    fetchUsers,
    loginUser,
    userProfile,
    updateUserProfile
}