// * Importing Libraries
import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
// * Importing dotenv package
import dotenv from 'dotenv'
// * Importing db.js file (which connects our application to DB)
import connectDB from './config/db.js'
// * importing colors to use different colors to show the console attractive
import colors from 'colors'

// * Importing Routes files
// import productRoutes from './routes/productRoutes.js'
import playerRoutes from './routes/playerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import teamRoutes from "./routes/teamRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
// * Importing custom Error Handlers (Custom Middleware)
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// ! ==================================================
// *    initializing the express App
const app = express()
app.use(cors());
//* Using Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// * config() the dotenv (.env) file
dotenv.config()
// * calling the connectDB function to connect with the DB
connectDB()

// !========================================================
// ? that will allows us to accept Json data in the body
// ? and it is mandatory to write it before Routes (sequence really matters here!)
app.use(express.json()) // ? that will allows us to accept Json data in the body

// * Routing in Express
app.get('/', (req, res) => {
  res.send('API is running..........')
})
app.use('/api/player', playerRoutes); // team
app.use('/api/teams', teamRoutes); // team
app.use('/api/users', userRoutes)  // user
app.use('/api/matches', matchRoutes);
app.use(notFound)
app.use(errorHandler)

// !========================================

// ! using environment variable i.e. PORT & NODE_ENV
const PORT = process.env.PORT || 5000

// * Listening the App at the specific port
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
)
