import QRCode from "qrcode";
import Borrow from "../models/BorrowedBooks.js";
import Book from '../models/Book.js'

// const borrowBook = async (req, res) => {
//     try {
//         const { bookId } = req.params;
//         const userId = req.user._id; 
//         const book = await Book.findById(bookId);
//         if (!book) {
//             return res.status(404).json({ message: "Book not found." });
//         }
//         if (book.copies < 1) {
//             return res.status(400).json({ message: "No copies of this book are available." });
//         }

//         // --- 2. Validation Step: Check if user already has an active request for this book ---
//         const existingRequest = await Borrow.findOne({
//             book: bookId,
//             user: userId,
//             status: { $in: ['pending', 'approved'] }
//         });

//         if (existingRequest) {
//             return res.status(400).json({ message: `You already have an '${existingRequest.status}' request for this book.` });
//         }

//         // --- 3. Create the borrow request ---
//         const borrow = new Borrow({
//             user: userId,
//             book: bookId,
//             status: 'pending' // ✅ Explicitly set the status
//         });
//         await borrow.save();

//         // You can remove the QR code logic if it's not needed for a pending request
//         res.status(201).json({ message: "Borrow request sent for approval.", borrow });

//     } catch (err) {
//         console.error("Borrow error:", err);
//         res.status(500).json({ error: err.message });
//     }
// };


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

    // 🔎 Find any existing borrow request by this user for this book
    const existingRequest = await Borrow.findOne({ book: bookId, user: userId })
      .sort({ createdAt: -1 }); // get latest borrow attempt

    if (existingRequest) {
      if (["pending", "approved"].includes(existingRequest.status)) {
        return res.status(400).json({ message: `You already have an '${existingRequest.status}' request for this book.` });
      }
      if (existingRequest.status === "returned" || existingRequest.status === "rejected") {
        // ✅ Allow re-borrow → create a new borrow request
        const borrow = new Borrow({
          user: userId,
          book: bookId,
          status: "pending",
        });
        await borrow.save();
        return res.status(201).json({ message: "Re-borrow request sent for approval.", borrow });
      }
    }

    // ✅ First-time borrow
    const borrow = new Borrow({
      user: userId,
      book: bookId,
      status: "pending",
    });
    await borrow.save();

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

// PATCH /api/borrow/return/:borrowId
const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow) {
      return res.status(404).json({ success: false, message: "Borrow not found" });
    }

    if (borrow.status !== "approved") {
      return res.status(400).json({ success: false, message: "Only approved books can be returned" });
    }

    // Update borrow status
    borrow.status = "returned";
    await borrow.save();

    // Increase book copy count
    borrow.book.copies += 1;
    await borrow.book.save();

    res.json({ success: true, message: "Book returned successfully", borrow });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};




export { borrowBook, withdrawRequest, returnBook };
