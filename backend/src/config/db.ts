const mongoose = require("mongoose");
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.MONGO_URI || ""


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
