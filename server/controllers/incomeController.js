const Income = require('../models/incomeModel')
const asyncHandler = require('express-async-handler')


// @desc    Create an Income
// @route   POST /api/income
// @access  Private
const createIncome = asyncHandler (async (req, res) => {
    // what we are receieving from frontend
    const {title, amount, description} = req.body
    try {
        // create an instance of income
        const income = await Income.create({
            title,
            amount,
            description,
            user: req?.user._id
        })   
        
        // Send back that income instance
        res.json(income)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Get all income reports
// @route   GET /api/income
// @access  Private
const fetchAllIncome = asyncHandler (async (req, res) => {
    // query string destructuring
    const {page} = req.query
    try {
        // Recieve back all instances of income: Pagination only showing 10 results per page
        const income = await Income.paginate({}, {limit: 10, page: Number(page),
            populate: 'user'}) // refrencing field named user in our model
        res.json(income)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Get single income
// @route   GET /api/income
// @access  Private
const fetchIncome = asyncHandler (async (req, res) => {
    // recieving id from the params
    const {id} = req?.params
    try {
        // Recieve an instance of income by id
        const income = await Income.findById(id)
        res.json(income)
    } catch (error) {
        res.json(error)
    }
})


// @desc    Update Income Report
// @route   PUT /api/income
// @access  Private
const updateIncome = asyncHandler( async (req, res) => {
    // Need to grab id of particular income report we would like to update
    const {id} = req?.params

    // Different properties we may update
    const {title, amount, description} = req.body

    try {
        // Grabbing particular income report, refrencing which fields may be updated
        const income = await Income.findByIdAndUpdate(id, {
            title,
            description,
            amount
        },
        {new: true})
    } catch (error) {
        
    }
})


// @desc    Delete Income Report
// @route   DELETE /api/income
// @access  Private
const deleteIncome = asyncHandler (async (req, res) => {
    // recieving id from the params
    const {id} = req?.params
    try {
        // Recieve an instance of income by id
        const income = await Income.findByIdAndDelete(id)
        res.json(income)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {
    createIncome,
    fetchAllIncome,
    fetchIncome,
    updateIncome,
    deleteIncome

}
