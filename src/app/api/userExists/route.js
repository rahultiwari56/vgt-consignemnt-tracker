// src/app/api/userExists/route.js

import connectMongoDB from "../../lib/mongodb"; // Ensure this path is correct
import User from "@/models/user"; // Adjust the path as needed
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log("Database connected.");

    // Parse JSON from the request body
    const { email } = await req.json();
    console.log("Received email:", email);

    // Find the user by email
    const user = await User.findOne({ email }).select("_id");
    console.log("User found:", user);

    // Respond with user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error during database operation:", error);
    return NextResponse.json(
      { message: "Database operation failed", error: error.message },
      { status: 500 }
    );
  }
}
