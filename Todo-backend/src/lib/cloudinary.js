import cloudinary from "cloudinary"
import fs from "fs"
import { FOLDER_NAME } from "./configuration.js"
import { ApiError } from "./ApiError.js"

cloudinary.config({
    cloud_name:`${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key:`${process.env.CLOUDINARY_API_KEY}`,
    api_secret:`${process.env.CLOUDINARY_API_SECRET}`
})

// console.log(`Cloud name: ${process.env.CLOUDINARY_CLOUD_NAME}`)

const uploadFile=async(localFilePath,dir=FOLDER_NAME)=>
    {
    try {
        if(!localFilePath)
            return null
        const response= await cloudinary.v2.uploader.upload(
            localFilePath,
            {
                resource_type:"auto",
                folder:dir
            }
        )
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // console.error("Cloudinary FULL Error:", error);
        return null    
    }
}

export {uploadFile}

