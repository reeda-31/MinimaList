import {asyncHandler} from  "../lib/asyncHandler.js"
import {ApiError} from "../lib/ApiError.js"
import {ApiResponse} from "../lib/ApiResponse.js"
import { User } from "../models/User.model.js"
import bcrypt from "bcrypt"
import { MAX_EMAIL_LENGTH, PASSWORD_LENGTH, FOLDER_NAME } 
from "../lib/configuration.js";
import { uploadFile,deleteFile } from "../lib/cloudinary.js"


/*
1.getUser
2.updateUser
3.deleteUser
*/

const getUserProfile=asyncHandler(async(req,res)=>{
    const {email,username,avatar}=req.user
    return res.status(200).json(new ApiResponse(200,{email,username,avatar},"User details fetched"))
})

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user?._id)
    if(!user)
        throw new ApiError(404,"User not found");

    const {email,username,password}=req.body
    const avatarLocalPath=req.file?.path

    if(email||username||password||avatarLocalPath){
        if(email){
                if(email.length>MAX_EMAIL_LENGTH){
        throw new ApiError(400,"email length exceeded!!")
                }
            
        user.email=email
        }

        if(password){
            if(password.length<PASSWORD_LENGTH){
                throw new ApiError(400,"Password should be minimum 8 characters!")
            }
        const hashedPassword=await bcrypt.hash(password,10)
        user.password=hashedPassword
        }

        if(username){
            user.username=username
        }

        if(avatarLocalPath){
            const avatarUploadResponse= await uploadFile(avatarLocalPath,
            `${FOLDER_NAME}`)
            if(!avatarUploadResponse?.url){
                throw new ApiError(500,"Avatar upload failed");
            }
            if(user.avatar.public_id){
                await deleteFile(user.avatar.public_id)
            }
            user.avatar={
                public_id:avatarUploadResponse.public_id,
                url:avatarUploadResponse.url
            }
        }
        await user.save()
        const updatedUser= await User.findById(req.user._id).select("-password")
        return res.status(200).json(new ApiResponse(200,updatedUser,"User Updated"))
    }
    else{
        throw new ApiError(400,"No fields provided for update");
    }
        
})

const deleteUser = asyncHandler(async(req,res)=>{
    
        const user= await User.findById(req.user?._id)
        if(!user)
        {
            throw new ApiError(404,"User not found")
        }
        const userAvatar = user.avatar
        if(userAvatar){
            await deleteFile(userAvatar)
        }
        await user.deleteOne()
        res.clearCookie("jwt",{httpOnly:true,sameSite:"none",secure:true})
        return res.status(200).json(new ApiResponse(200,{},"User deleted successfully!"))
    
})


export {getUserProfile,updateUserProfile,deleteUser}