
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://rajrai0812:RAJ7987150507@cluster0.3fh4d.mongodb.net/receiptData", {
      dbName: 'receiptData',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

    
// import {MongoClient} from 'mongodb'
// import { NextResponse } from 'next/server';


// // Replace the uri string with your connection string.

// export async function POST(request) {

//   let body = await request.json();


// const uri="mongodb+srv://rajrai0812:RAJ7987150507@cluster0.3fh4d.mongodb.net/receiptData";



// const client = new MongoClient(uri);


// try {


// const database = client.db('receipts');

// const transportReceipts =  database.collection('transportReceipts');



// const data = await transportReceipts.insertOne(body);
// return NextResponse.json({ok:true,data})
// }
// finally{
//   await client.close();
// }





// }