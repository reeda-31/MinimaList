import { asyncHandler } from "../lib/asyncHandler.js";
import { ApiError } from "../lib/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import {Todo} from "../models/Todo.model.js"

const createTodo = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {title,dueDate,completed,category}=req.body

    if(!title||!title.trim()){
        throw new ApiError(400,"Title is required")
    }

    if(dueDate&&isNaN(Date.parse(dueDate))){
        throw new ApiError(400,"Due date entered is invalid");
    }

    const newTodo=await Todo.create({
        title,
        user:req.user._id,
        dueDate,
        completed,
        category
    })

    return res.status(201).json(new ApiResponse(201,newTodo,"Todo Created Successfully"))
})

const updateTodo=asyncHandler(async(req,res)=>{
    const todoId= req.params?.id
    const todo = await Todo.findById(todoId)

    if(!todo){
        throw new ApiError(404,"Todo not found")
    }
    const{title,completed,dueDate}=req.body
    if(title === undefined && completed === undefined && dueDate === undefined){
        throw new ApiError(400,"Fields are missing")
    }
    else{
        if(title){
            todo.title=title
        }
        if(completed !== undefined){
            todo.completed=completed
        }
        if(dueDate){
            todo.dueDate=dueDate
            todo.reminderSent=false
        }
    }

    await todo.save()
    const updatedTodo= await Todo.findById(req.params?.id)
    if(!updatedTodo){
        throw new ApiError(500,"Failed To update Todo");
    }
    return res.status(200).json(new ApiResponse(200,updatedTodo,"Todo Updated Successfully"))
})

const deleteTodo=asyncHandler(async(req,res)=>{
    const todoid=req.params?.id
    const todo = await Todo.findById(todoid)
    if(!todo){
        throw new ApiError(404,"Todo not found!")
    }
    const deletion= await todo.deleteOne()
    if(!deletion){
        throw new ApiError(500,"Error while deleting Todo")
    }
    return res.status(200).json(new ApiResponse(200,{},"Todo deleted Successfully!"))
})

const getAllTodos=asyncHandler(async(req,res)=>{
    const userId= req.user._id
    const todos= await Todo.find({user:userId}).sort({createdAt:-1})
    return res.status(200).json(new ApiResponse(200,todos,"Todos fetched Successfully!"))
})

export {createTodo,updateTodo,deleteTodo,getAllTodos}