// models/Borrow.js
import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  qrCode: { type: String }, // store QR data
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'returned'], 
    default: "pending" 
  },
  borrowedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Borrow", borrowSchema);
