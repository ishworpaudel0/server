import mongoose from 'mongoose';
import { config } from '../config';
import logger from '../utils/logger'; // Assuming you create a logger util

const connectDB = async () => {
    try {
        if (!config.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(config.MONGO_URI);
        // Winston 'info' level for successful connections
        logger.info("MongoDB connected successfully"); 
    }
    catch (error) {
        // Winston 'error' level to automatically save this to your log files
        logger.error("DB connection error:", error);
        process.exit(1);    
    }
};

export default connectDB;