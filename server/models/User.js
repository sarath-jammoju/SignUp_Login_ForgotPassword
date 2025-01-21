import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI=process.env.MONGO_URI;


async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return; // Prevent duplicate connections
    }
  
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.error("Error connecting to MongoDB Atlas:", error.message);
      process.exit(1); // Exit the process on failure
    }
  }
  
  connectToDatabase();



const UserSchema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true}
})

const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User}