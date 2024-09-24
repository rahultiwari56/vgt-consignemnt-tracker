// pages/api/save-transport-receipt.js
import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb"; // Ensure the path is correct
import TransportReceipt from "@/models/formData"; // Import the model

export async function POST(req) {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected.");

    const body = await req.json(); // Parse JSON from the request body
    console.log("Received data:", body);

    // Create a new document using the TransportReceipt model
    const newReceipt = new TransportReceipt(body);

    // Save the document to MongoDB
    await newReceipt.save();

    // Respond with success message
    return NextResponse.json(
      { success: true, message: "Transport receipt saved successfully", receipt: newReceipt },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during database operation:", error);
    return NextResponse.json(
      { message: "Database operation failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected.");

    console.time('Fetch Receipts'); // Start measuring time

    // Fetch all receipts from the database
    const receipts = await TransportReceipt.find({});
    
    console.timeEnd('Fetch Receipts'); // End measuring time

    // Check if receipts are fetched successfully
    if (receipts.length === 0) {
      return NextResponse.json(
        { success: false, message: "No receipts found" },
        { status: 404 }
      );
    }

    // Return all receipts if found
    return NextResponse.json(
      { success: true, data: receipts }, // Return the entire array of receipts
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data", error: error.message },
      { status: 500 }
    );
  }
}



// PUT Handler to Update an Existing Receipt
export async function PUT(req) {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected.");

    const body = await req.json(); // Parse JSON from the request body
    console.log("Received data for update:", body);

    // Validate data (simple example)
    if (!body._id || !body.demurrageChargeable) {
      return NextResponse.json(
        { success: false, message: "Validation error: Missing required fields" },
        { status: 400 }
      );
    }

    // Update the receipt based on the provided ID
    const updatedReceipt = await TransportReceipt.findByIdAndUpdate(
      body._id,
      { $set: body },
      { new: true } // Return the updated document
    );

    if (!updatedReceipt) {
      return NextResponse.json(
        { success: false, message: "Receipt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Transport receipt updated successfully", receipt: updatedReceipt },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during update operation:", error);
    return NextResponse.json(
      { message: "Update operation failed", error: error.message },
      { status: 500 }
    );
  }
}


// done