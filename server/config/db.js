import mongoose from "mongoose";

const connectDB = async (listen) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection successful");
        listen(); // Start the server only after DB connection is successful
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Stop the process if connection fails
    }
};
export default connectDB;
