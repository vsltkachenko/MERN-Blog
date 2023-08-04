import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileupload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

//Const
const PORT = process.env.PORT
const URL = process.env.URL

//Middleware
app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use(express.static('uploads'))

//Routs
//http://localhost:3002/
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

mongoose.set('strictQuery', true)

async function start() {
	try {
		await mongoose.connect(URL).then(() => {
			console.info(`Connected to database`)
		})
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}`)
		})
	} catch (error) {
		console.log('Failed to connect to MongoDB', error)
	}
}
start()
