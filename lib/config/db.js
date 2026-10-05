import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("Database connection error: MONGODB_URI is not defined in environment variables.");
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log("Db connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}