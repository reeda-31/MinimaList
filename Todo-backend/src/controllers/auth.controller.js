import {User} from "../models/User.model.js"
import {uploadFile} from "../lib/cloudinary.js"
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie } from "../lib/token.js"
import { ApiError } from "../lib/ApiError.js"
import {ApiResponse} from "../lib/ApiResponse.js"
import {asyncHandler} from "../lib/asyncHandler.js"
import { MAX_EMAIL_LENGTH, PASSWORD_LENGTH, FOLDER_NAME } 
from "../lib/configuration.js";

/*
1.REGISTER USER :
->Take user details 
->verify details
->check if user already exists
->if avatar is present upload on cloudinary
->hash password using bcrypt
->create user
->generate token and set cookie
->pass jwt except password
->return response
*/
const registerUser=asyncHandler(async (req,res)=>{
    const  {username,email,password}=req.body
    const avatarLocalPath=req.file?.path
    
    if(username===""){
        throw new ApiError(400,"email is required");
    }
    else if(email===""){
        throw new ApiError(400,"email is required");
    }
    else if(password===""){
        throw new ApiError(400,"password is required");
    }

    if(email.length>MAX_EMAIL_LENGTH){
        throw new ApiError(400,"email length exceeded!!")
    }

    if(password.length<PASSWORD_LENGTH){
        throw new ApiError(400,"Password should be minimum 8 characters!")
    }

    const existingUser= await User.findOne({
        $or:[{username},{email}]
    })
    if(existingUser){
        throw new ApiError(400,"User already exists")
    }

    // console.log(avatarLocalPath)
    
    let avatar
    if(avatarLocalPath){
        const avatarUploadResponse= await uploadFile(avatarLocalPath,
            `${FOLDER_NAME}`
        )
        // console.log("Response:",avatarUploadResponse)
        if(!avatarUploadResponse?.secure_url){
            throw new ApiError(500,"Failed to upload Avatar.")
        }
        avatar=avatarUploadResponse.url
            }
            else{
        avatar={
            public_id: null,
            url:`${process.env.BASE_URL}/image.png`
        }        
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const newUser= await User.create({
        email,
        username,
        password:hashedPassword,
        avatar
    })
    if(!newUser){
        throw new ApiError(400,"Failed to create new User")
    }
    
    generateTokenAndSetCookie(newUser._id,res)

    const createdUser=await User.findById(newUser._id).select("-password")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }

    return res.status(200).json( new ApiResponse(200,createdUser,"User Created Successfully!"))
    }
)

/*
2.LOGIN USER
->extract details 
->verify if all the necessary details are present
->if not present throw an error
->if present find user by email or username
->check if entered password is correct
->generate token and set cookie
->return user
*/

const loginUser = asyncHandler(async(req,res)=>{
    
    const {email,username,password}=req.body

    if(!(username||email)){
        throw new ApiError(400,"LOGIN: username or email is required");       
    }
    if(!password){
        throw new ApiError(400,"LOGIN: password is required");       
    }

    const searchUser= await User.findOne({
        $or:[{username},{email}]
    })
    if(!searchUser){
        throw new ApiError(404,"User does not exist!");
    }

    const validPassword= await bcrypt.compare(password,searchUser?.password)
    if(!validPassword){
        throw new ApiError(400,"Incorrect Password"); 
    }

    generateTokenAndSetCookie(searchUser._id,res)

    const user=await User.findById(searchUser._id).select("-password")

    return res.status(200).json(new ApiResponse(200,user,"User Logged In successfully!"))
})

/*
3.LOGOUT USER
->clear cookie
*/

const logoutUser=asyncHandler(async(req,res)=>{

    const options= {
        httpOnly:true,
        sameSite:"none",
        secure:true
    }

    return res.status(200).clearCookie("jwt",options)
    .json(new ApiResponse(200,{},"User Logged Out Sucessfully!"))
})

const currentUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"Current user fetched!"))
})

export {registerUser,loginUser,logoutUser,currentUser}