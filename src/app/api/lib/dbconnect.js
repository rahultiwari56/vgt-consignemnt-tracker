import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect("mongodb+srv://rajrai0812:RAJ7987150507@cluster0.3fh4d.mongodb.net/", { dbName: 'receiptData',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
    