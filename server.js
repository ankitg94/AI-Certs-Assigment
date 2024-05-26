import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConnect } from "./config/db.js"
import dataRoute from "./routes/dataRoute.js"
//step-1(host)
import path from 'path'
import { fileURLToPath } from "url";
//database connection

dbConnect()
//dotenv config
dotenv.config()

//mongodb connection 

dbConnect()
//rest object 
const app =express()

//middleware
app.use(cors())
app.use(express.json())


//routes
//app.get('/',(req,res)=>{})
app.use("/api/v1/data",dataRoute)



//port
const port =process.env.PORT || 8080

//port listen 
app.listen(port,()=>{
    console.log(`server Runing on the server : ${port}`)
})
