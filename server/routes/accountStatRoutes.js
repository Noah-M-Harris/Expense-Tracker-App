const express = require('express')
const router = express.Router()


const {
    accountStats
} = require('../controllers/accStatsController')


// Middleware 
const { authMiddleware } = require('../middleware/auth')

router.get('/account-statistics', authMiddleware, accountStats)

module.exports = router