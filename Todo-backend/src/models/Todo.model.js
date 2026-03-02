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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dueDate:{
        type:Date,
        default:null
    },
    reminderSent:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Todo= mongoose.model("Todo",todoSchema)