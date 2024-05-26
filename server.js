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
//02-hosting k liye(start)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// hositng (end)

//rest object 
const app =express()

//middleware
app.use(cors())
app.use(express.json())


//routes

//03-hoisting(start)
app.use(express.static(path.join(__dirname, './client/build')))
// hositng (end)
//app.get('/',(req,res)=>{})
app.use("/api/v1/data",dataRoute)

//04-hoisting(start)
app.use("*",function(req,res){
       res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
// hositng (end)


//port
const port =process.env.PORT || 8080

//port listen 
app.listen(port,()=>{
    console.log(`server Runing on the server : ${port}`)
})
