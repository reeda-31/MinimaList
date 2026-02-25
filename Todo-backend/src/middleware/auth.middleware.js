import { ApiError } from "../lib/ApiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken"

const verifyJWT= asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized Request")
    }

    const decodedToken=jwt.verify(token,process.env.JWT_TOKEN_SECRET)

    const user = await User.findById(decodedToken?.userId).select("-password")

    if(!user){
        throw new ApiError(401,"Invalid Token")
    }

    req.user=user
    next()
})

export {verifyJWT}