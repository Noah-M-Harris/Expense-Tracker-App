const http = require('http')
const dotenv = require('dotenv')
dotenv.config()


const app = require('./app')

const port = process.env.PORT || 4500

const server = http.createServer(app)

try {
    server.listen(port, console.log(`Server listening`))
} catch (error) {
    console.log(error)
}
