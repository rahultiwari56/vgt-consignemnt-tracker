import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb"; // Ensure the path is correct
import TransportReceipt from "@/models/formData"; // Import the model
import { ObjectId } from "mongodb"; // Import ObjectId

export async function POST(req) {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected.");

    const body = await req.json(); // Parse JSON from the request
    const { id } = body; // Extract `id` from the parsed request body
    console.log("Received ID:", id);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Use `new` to create an instance of ObjectId
    const receipt = await TransportReceipt.findById(new ObjectId(id));

    // If the receipt is found, return it
    if (receipt) {
      return NextResponse.json(
        { success: true, message: "Receipt found", receipt },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Receipt not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error during database operation:", error);
    return NextResponse.json(
      { message: "Database operation failed", error: error.message },
      { status: 500 }
    );
  }
}
