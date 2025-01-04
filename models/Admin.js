import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] 
  },
  password: { 
    type: String, 
    required: true 
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
