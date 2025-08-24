import mongoose from 'mongoose'

const borrowedBookSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  qrCode: { type: String }, // store QR image URL or base64
  status: { type: String, default: "Pending" }, // Pending, Collected, Returned
});


const borrowedBook = mongoose.model("borrowedBook", borrowedBookSchema);
export default borrowedBook