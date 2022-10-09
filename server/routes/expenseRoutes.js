const express = require('express')
const router = express.Router()



const {
    createExpense,
    fetchAllExpense,
    fetchExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController')

// Middleware 
const { authMiddleware } = require('../middleware/auth')

router.post('/', authMiddleware, createExpense)
router.get('/', authMiddleware, fetchAllExpense)
router.get('/:id', authMiddleware, fetchExpense)
router.put('/:id', authMiddleware, updateExpense)
router.delete('/:id', authMiddleware, deleteExpense)




module.exports = router