import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { readdirSync } from "fs"
const morgan = require('morgan')
require("dotenv").config()
const multer = require("multer")

const app = express()

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err)=>console.log("DB error: ", err))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("Infoling server processing request")
    next()
})

readdirSync('./routes').map((r) => {
    app.use("/api", require(`./routes/${r}`))
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server running on port ${port}`))
