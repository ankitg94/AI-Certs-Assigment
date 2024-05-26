import dataModels from "../models/dataModels.js"

export const createDataController= async(req,res)=>{
 try{
    //get from the body
    const {title,description,status,dueDate} =req.body
    //validation
    if(!title||!description||!status||!dueDate){
        return res.status(400).send({
            success:false,
            message:"Please fill all the fields"
        })
    }
    // Ensure today and dueDate are valid dates
 const todayDate =new Date()
 const dueDateDate = new Date(dueDate);

 // Log dates to the console for debugging
 console.log('Today:',todayDate);
 console.log('Due Date:', dueDateDate);

 // Calculate the difference in milliseconds
 const diffTime = Math.abs(dueDateDate - todayDate);

 // Convert the difference from milliseconds to days
    var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const data = await dataModels({title,description,status,dueDate,diffDays})
     
    await data.save()
    //return response
    return (res.status(201).send({  
        success: true, 
        message: "Task register succesfully",
        data,
          
       })
    );
 }catch(error){
    res.status(400).send({
        success:true,
        message:"Error in creating the TODO"
    })
 }
}


//get the data


export const  getDataController =async(req,res)=>{
 try{
    //get the data from modals
 const Alldata = await dataModels.find({}).sort({createdAt:-1});
 
      //success response
       res.status(200).send({
        length:Alldata.length,
        success:true,
        Message:"Get your category here",
        Alldata,
        
    })
 }catch(error){
        res.status(400).send({
        success:true,
        message:"Error in creating the crud"
    })
 }
}

//update the data
export const updateDataController  =async(req,res)=>{
    try{
        const {title,description,status,dueDate}=req.body
        const {id} =req.params
            // Ensure today and dueDate are valid dates
 const todayDate =new Date()
 const dueDateDate = new Date(dueDate);

 // Log dates to the console for debugging
 console.log('Today:',todayDate);
 console.log('Due Date:', dueDateDate);

 // Calculate the difference in milliseconds
 const diffTime = Math.abs(dueDateDate - todayDate);

 // Convert the difference from milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));


        const Category = await dataModels.findByIdAndUpdate(id,{title,description,status,dueDate,diffDays},{new:true})
         res.status(200).send({
            success:true,
            Message:"category updated succesfully",
            Category
        })
    }
    catch(error){
        res.status(400).send({
            success:true,
            message:"Error in creating the crud"
        })

    }
}

//delete the data
export const DeleteDataController  = async(req,res)=>{
    try{
        const {id} = req.params;
        await dataModels.findByIdAndDelete(id);
        
        res.status(200).send({
            success:true,
            Message:"category Deleted succesfully"
        })

    }catch(error){
        res.status(400).send({
            success:true,
            message:"Error in creating the crud"
        })

    }
}