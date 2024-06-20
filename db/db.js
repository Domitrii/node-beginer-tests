import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const {DB_URI} = process.env

await mongoose.connect(DB_URI).then(console.log("database connection is OK"))
.catch(error => {
    console.error("u have error: ", error)
    process.exit(1)
}) 