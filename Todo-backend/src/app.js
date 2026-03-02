import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()
//console.log("CORS ORIGIN: ",process.env.CORS_ORIGIN)
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/todo",todoRoutes)


export default app
