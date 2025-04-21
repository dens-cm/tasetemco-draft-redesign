import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import morgan from "morgan"

// endpoints
import auth from './endpoints/auth.js'
import protectedRoute from './endpoints/protected.js'

dotenv.config()
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "https://tasetemco.onrender.com", "https://tasetem.co"],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan("combined")) 

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

// MongoDB connection
mongoose.connect(MONGO_URI).then(() => console.log("MongoDB Connected")).catch((err) => console.log("Error:", err))

app.use("/", protectedRoute)
app.use("/auth", auth)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})