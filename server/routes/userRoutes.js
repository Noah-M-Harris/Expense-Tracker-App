const express = require('express')
const router = express.Router()



const {
    registerUser,
    fetchUsers,
    loginUser,
    userProfile,
    updateUserProfile
} = require('../controllers/userController')

// Middleware 
const { authMiddleware } = require('../middleware/auth')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/fetch', authMiddleware, fetchUsers)
router.get('/profile', authMiddleware, userProfile)
router.patch('/update', authMiddleware, updateUserProfile)




module.exports = router
