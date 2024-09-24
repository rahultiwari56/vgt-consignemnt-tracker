// pages/api/save-transport-receipt.js
import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb"; // Ensure the path is correct
import TransportReceipt from "@/models/formData"; // Import the model



export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected.");

    // Correct use of console.time and console.timeEnd
    console.time('Fetch Receipts');
    const receipts = await TransportReceipt.find({});
     let uniqueId = "001"
    let arr = receipts.map((number)=>number?.uniqueNumber)

    if(arr.length >0)
    {
        uniqueId = parseInt(arr[arr.length-1]) + 1
        if(uniqueId<10){
            uniqueId = "00"+uniqueId
        } 
        else if(uniqueId<100){
            uniqueId = "0"+uniqueId
        }
    }
    console.log(uniqueId,"uniqueid")
    console.timeEnd('Fetch Receipts');

    return NextResponse.json(
      { success: true,uniqueId:uniqueId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return NextResponse.json(
      { message: "Failed to fetch data", error: error.message },
      { status: 500 }
    );
  }
}





// done