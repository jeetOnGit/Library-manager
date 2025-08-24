import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: { type: String, unique: true },
  publisher: String,
  year: String,
  genre: String,
  language: String,
  copies: Number,
  issuedCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["available", "issued", "not available", "delayed"],
    default: "available",
  },
  location:{
     type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});


const Book = mongoose.model("Book", bookSchema);
export default Book