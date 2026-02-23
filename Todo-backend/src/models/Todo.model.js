import mongoose from "mongoose"

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    }, 
    completed:{
        type:Boolean,
        default:false
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dueDate:{
        type:Date
    },
    reminderSent:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Todo= mongoose.model("Todo",todoSchema)