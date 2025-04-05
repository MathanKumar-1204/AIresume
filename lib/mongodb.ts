import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/jobmatchai";

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  return mongoose.connect(MONGODB_URI);
}
