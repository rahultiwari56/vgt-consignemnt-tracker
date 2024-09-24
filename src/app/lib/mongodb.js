// src/app/lib/mongodb.js

import mongoose from "mongoose";

let isConnected = false; // Track the connection status

// Define the function to connect to MongoDB
async function connectMongoDB() {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "receiptData",  // Ensure this is the correct database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw new Error("Could not connect to the database.");
  }
}

// Export the function as default
export default connectMongoDB;
