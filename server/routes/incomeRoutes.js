const express = require('express')
const router = express.Router()



const {
    createIncome,
    fetchAllIncome,
    fetchIncome,
    updateIncome,
    deleteIncome
} = require('../controllers/incomeController')


// Middleware 
const { authMiddleware } = require('../middleware/auth')


router.post('/', authMiddleware, createIncome)
router.get('/', authMiddleware, fetchAllIncome)
router.get('/:id', authMiddleware, fetchIncome)
router.put('/:id', authMiddleware, updateIncome)
router.delete('/:id', authMiddleware, deleteIncome)




module.exports = router