// Example of User model (ensure this is correct)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Make sure this matches your actual schema
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
