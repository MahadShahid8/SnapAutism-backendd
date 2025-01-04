import mongoose from "mongoose";
const { Schema, model, Types } = mongoose; 

// Test Schema
const TestSchema = new Schema({
  testName: { type: String, required: true },
  dateTaken: { type: Date, required: true },
  result:{type:Boolean},
  userResponses: [] , //user responses array
  status: { 
    type: String, 
    enum: ['complete', 'incomplete'], // Only "complete" or "incomplete" allowed
    default: 'incomplete', // Set default value to 'incomplete'
    required: true
  }
});

export const Test = mongoose.model("Test", TestSchema);
