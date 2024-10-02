import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
})

import { app } from "./app.js";
const port = process.env.PORT || 8000


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is runnning at ${port}`)
    })
})
.catch((error) => {
    console.log(`Connection failed !!`)
})
