const asyncHandler = require('express-async-handler')
const Income = require('../models/incomeModel')
const Expense = require('../models/expenseModel')

const accountStats = asyncHandler( async(req, res) => {
    try {
       // Expense Stats: Adding up all the expenses
    const expenseStats = await Expense.aggregate([
        // filter: filtered for records with an amount greater than or equal to 0
        {$match: {amount: {$gte: 0}}},
        {
            // group: finding the avg, sum, min, max of all the amounts
            $group: {
                _id: null,
                avgExpense: {$avg: "$amount"},
                totalExpenses: {$sum: "$amount"},
                minExpense: {$min: "$amount"},
                maxExpense: {$max: "$amount"},
                totalExpenseRecords: {$sum: 1},
            }
        }
    ])


    // Income Stats: Adding up all the Income reports
    const incomeStats = await Income.aggregate([
        // filter: filtered for records with an amount greater than or equal to 0
        {$match: {amount: {$gte: 0}}},
        {
            // group: finding the avg, sum, min, max of all the amounts
            $group: {
                _id: null,
                avgIncome: {$avg: "$amount"},
                totalIncome: {$sum: "$amount"},
                minIncome: {$min: "$amount"},
                maxIncome: {$max: "$amount"},
                totalIncomeRecords: {$sum: 1},
            }
        }
    ])
    
    const profit = incomeStats[0].totalIncome - expenseStats[0].totalExpenses
    res.json({expenseStats, incomeStats, profit})
    } catch (error) {
       res.json(error) 
    }



})

module.exports = {
    accountStats
}