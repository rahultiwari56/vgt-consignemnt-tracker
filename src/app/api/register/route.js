import connectMongoDB from "../../lib/mongodb"; // Ensure this path is correct
import User from "@/models/user"; // Adjust the path as needed
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcryptjs

export async function POST(req) {
  try {
    await connectMongoDB();
    console.log("Database connected.");

    const { name, email, password } = await req.json();
    console.log("Received data:", { name, email, password });

    // Check if the user already exists
    const existingUser = await User.findOne({ email }).select("_id");
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
