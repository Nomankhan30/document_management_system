import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import dbConnect from "./config/dbConnection.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT
const URL = process.env.MONGO_URL
const name = process.env.DB_NAME

app.use("/", (req, res, next) => {
    console.log("MIDDLE WARE HIT")
    console.log("process.env.PORT", process.env.PORT)
    next()
})

app.get("/api/auth", authmid, authRoute)

app.get("/", (req, res) => {
    res.send("HI! WELCOME TO BACKEND CLASSES")
})
app.listen(PORT, function () {
    console.log("SERVER IS RUNNING ON PORT", PORT)
    dbConnect(URL, name)

}
)