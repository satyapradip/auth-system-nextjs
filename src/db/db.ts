import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {  //
      return;
    }
    await mongoose.connect(process.env.MONGO_URI!)

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } 

}