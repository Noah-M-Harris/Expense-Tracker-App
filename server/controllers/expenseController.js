const Expense = require('../models/expenseModel')
const asyncHandler = require('express-async-handler')


// @desc    Create an Expense
// @route   POST /api/expense
// @access  Private
const createExpense = asyncHandler (async (req, res) => {
    // what we are receieving from frontend
    const {title, amount, description} = req.body
    try {
        // create an instance of expense
        const expense = await Expense.create({
            title,
            amount,
            description,
            // Recieve user from middleware we have access to since it is protected by middleware
            user: req?.user?._id
        })   
        
        // Send back that expense instance
        res.json(expense)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Get all expenses
// @route   GET /api/expesne
// @access  Private
const fetchAllExpense = asyncHandler (async (req, res) => {
    // query string destructuring
    const {page} = req.query
    try {
        // Recieve back all instances of expense: Pagination only showing 10 results per page
        const expense = await Expense.paginate({}, {limit: 10, page: Number(page),
            populate: 'user'}) // same idea as with income controller: refrencing our model
        res.json(expense)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Get single epxense
// @route   GET /api/epxense
// @access  Private
const fetchExpense = asyncHandler (async (req, res) => {
    // recieving id from the params
    const {id} = req?.params
    try {
        // Recieve an instance of epxense by id
        const epxense = await Expense.findById(id)
        res.json(epxense)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Update Expense Report
// @route   PUT /api/epxense
// @access  Private
const updateExpense = asyncHandler( async (req, res) => {
    // Need to grab id of particular epxense report we would like to update
    const {id} = req?.params

    // Different properties we may update
    const {title, amount, description} = req.body

    try {
        // Grabbing particular epxense report, refrencing which fields may be updated
        const expense = await Expense.findByIdAndUpdate(id, {
            title,
            description,
            amount
        },
        {new: true})
    } catch (error) {
        res.json(error)
    }
})


// @desc    Delete Expense Report
// @route   DELETE /api/epxense
// @access  Private
const deleteExpense = asyncHandler (async (req, res) => {
    // recieving id from the params
    const {id} = req?.params
    try {
        // Recieve an instance of epxense by id
        const epxense = await Expense.findByIdAndDelete(id)
        res.json(epxense)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {
    createExpense,
    fetchAllExpense,
    fetchExpense,
    updateExpense,
    deleteExpense

}