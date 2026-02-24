import { ApiError } from "../lib/ApiError";
import { asyncHandler } from "../lib/asyncHandler";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken"

const verifyJWT= asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized Request")
    }

    const decodedToken=jwt.verify(token,process.env.JWT_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password")

    if(!user){
        throw new ApiError(401,"Invalid Token")
    }

    req.user=user
    next()
})

export {verifyJWT}