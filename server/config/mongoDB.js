import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

export default connectdb;