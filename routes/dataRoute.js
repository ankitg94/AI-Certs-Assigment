import express from "express"
import { DeleteDataController, createDataController, getDataController,updateDataController } from "../Controllers/dataController.js"

const route =express.Router()
//create Crud
route.post("/create",createDataController)
//read Crud
route.get("/get",getDataController)



//update Crud
route.put("/update/:id",updateDataController)

//delete Crud
route.delete("/delete/:id",DeleteDataController)




export default route