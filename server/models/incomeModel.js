const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const incomeSchema = mongoose.Schema({
    title: {
        required: [true, 'Title is required'],
        type: String,
    },
    description: {
        required: [true, 'Description is required'],
        type: String
    },
    type: {
        type: String,
        default: 'income'
    },
    amount: {
        required: [true, 'Amount is required'],
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // must be a mongoDb id
        ref: 'User',
        required: [true, 'User ID is required']
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    },
})

// Pagination
incomeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Income', incomeSchema)