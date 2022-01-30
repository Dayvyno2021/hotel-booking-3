import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { notFound } from './middleware/errorMiddleware.js'
import userRoute from './routes/userRoute.js'
import stripeRoute from './routes/stripeRoute.js'
import hotelRoutes from './routes/hotelRoutes.js'
import path from 'path'
const app  = express()

dotenv.config()
import connectDB from './config/db.js'
connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV==="development"){
  app.use(morgan('dev'))
}



app.use('/api/user', userRoute)
app.use('/api', stripeRoute)
app.use('/api', hotelRoutes)

const __dirname = path.resolve
if (process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else{
  app.get('/', (req, res) => {
    res.send('App is working')
  })
}

app.use(notFound)

const PORT = process.env.PORT || 3500
const NODE_ENV = process.env.NODE_ENV
app.listen(PORT, 
  ()=>console.log(`======>>server running in ${NODE_ENV} on ${PORT}`.rainbow))