import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://acpnsingh842323_db_user:Cpn%402005@cluster0.olzhpeh.mongodb.net/blogDB');
        console.log("Db connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}