import QRCode from "qrcode";
import Borrow from "../models/BorrowedBooks.js";
import Book from '../models/Book.js'

const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user._id; 
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }
        if (book.copies < 1) {
            return res.status(400).json({ message: "No copies of this book are available." });
        }

        // --- 2. Validation Step: Check if user already has an active request for this book ---
        const existingRequest = await Borrow.findOne({
            book: bookId,
            user: userId,
            status: { $in: ['pending', 'approved'] }
        });

        if (existingRequest) {
            return res.status(400).json({ message: `You already have an '${existingRequest.status}' request for this book.` });
        }

        // --- 3. Create the borrow request ---
        const borrow = new Borrow({
            user: userId,
            book: bookId,
            status: 'pending' // ✅ Explicitly set the status
        });
        await borrow.save();

        // You can remove the QR code logic if it's not needed for a pending request
        res.status(201).json({ message: "Borrow request sent for approval.", borrow });

    } catch (err) {
        console.error("Borrow error:", err);
        res.status(500).json({ error: err.message });
    }
};


const withdrawRequest = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id

    const result = await Borrow.deleteOne({
      book: bookId,
      user: userId,
      status: "pending", // Can only withdraw a pending request
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No pending request found to withdraw." });
    }

    res.status(200).json({ message: "Borrow request successfully withdrawn." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while withdrawing request.",
        error: error.message,
      });
  }
};

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id

    const borrowRecord = await Borrow.findOneAndUpdate(
      { book: bookId, user: userId, status: "approved" },
      { status: "returned" },
      { new: true }
    );

    if (!borrowRecord) {
      return res
        .status(404)
        .json({ message: "No active borrowed book found to return." });
    }

    // IMPORTANT: Increment the book's copy count
    await Book.findByIdAndUpdate(bookId, { $inc: { copies: 1 } });

    res
      .status(200)
      .json({ message: "Book returned successfully.", borrow: borrowRecord });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while returning book.",
        error: error.message,
      });
  }
};


// --- DATA FETCHING ACTIONS ---

// Get all of a user's own active/pending requests
// const getMyBorrowRequests = async (req, res) => {
//   try {
//     const userId = req.user._id
//     const requests = await Borrow.find({
//       user: userId,
//       status: { $in: ["pending", "approved"] },
//     });
//     res.status(200).json(requests);
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         message: "Server error fetching requests.",
//         error: error.message,
//       });
//   }
// };



export { borrowBook, withdrawRequest, returnBook };
