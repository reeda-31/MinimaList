import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const conn= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("Database Connected Successfully!!")
        console.log(`Connection host :${conn.connection.host}`)
    }
    catch(error){
        console.log("Failed to connect!",error)
        process.exit(1)
    }
}

export default connectDb;
