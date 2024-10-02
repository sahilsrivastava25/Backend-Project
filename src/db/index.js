import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // use extension .js to avoid errors.


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1) // process.exit( code ) Parameter: This function accepts single parameter as mentioned above and described below: Code: It can be either 0 or 1. 0 means end the process without any kind of failure and 1 means end the process with some failure.
    }
}

export default connectDB