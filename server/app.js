const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/connectDB')
const { 
    errorHandler,
    notFound 
} = require('./middleware/error')

connectDB()

const app = express()


// Middleware
app.use(express.json())
app.use(express.urlencoded( {extended: false}))
app.use(cors())


// Load Routers
const userRouter = require('./routes/userRoutes')
const incomeRouter = require('./routes/incomeRoutes')
const expenseRouter = require('./routes/expenseRoutes')
const accountRouter = require('./routes/accountStatRoutes')


/* app.get('/', (req, res) => {
    res.json({message: 'Expense Tracker'})
}) */


// Routers
app.use('/v1/users', userRouter)
app.use('/v1/income', incomeRouter)
app.use('/v1/expenses', expenseRouter)
app.use('/v1/account', accountRouter)


// Serve Frontend
if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

/* if (process.env.NODE_ENV == 'production') {
    //static folder add
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname , "../client/build", "index.html"));
    });
} */


// Error Handlers
app.use(notFound)
app.use(errorHandler)

module.exports = app

