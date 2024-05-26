
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type: String,
        enum: ['Pending','in-progress', 'completed'],
        default: 'Pending'
    },
    today:{
        type:Date
    },
    dueDate:{
         type:Date      
    },
    diffDays:{
        type: Number,
    
      },

},{timestamps:true})

export default mongoose.model('Data',DataSchema)

