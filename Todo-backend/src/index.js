
import "./env/env.js";
import connectDb from "./lib/db.js"

// dotenv.config({
//     path:'./.env'
// })

import app from "./app.js"

// dotenv.config({
//     path:'./.env'
// })

connectDb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB CONNECTION FAILED",error)
})



