import Borrow from "../models/BorrowedBooks.js";
import Book from '../models/Book.js'

const approveManually = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow not found" });

    if (borrow.status === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    borrow.status = "approved";
    await borrow.save();

    borrow.book.availableCopies -= 1;
    await borrow.book.save();

    res.json({ message: "Borrow approved manually", borrow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const rejectRequest = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrowRecord = await Borrow.findOneAndUpdate(
      { _id: borrowId, status: "pending" },
      { status: "rejected" },
      { new: true }
    );

    if (!borrowRecord) {
      return res
        .status(404)
        .json({ message: "No pending request found with this ID." });
    }

    // Note: We do NOT change the book's copy count on rejection.

    res
      .status(200)
      .json({ message: "Request rejected.", borrow: borrowRecord });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while rejecting request.",
        error: error.message,
      });
  }
};

const getAllPendingRequests = async (req, res) => {
    try {
        const pendingRequests = await Borrow.find({ status: 'pending' }).populate('user', 'name email').populate('book', 'title author');
        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching pending requests.', error: error.message });
    }
};

export { approveManually, rejectRequest, getAllPendingRequests }