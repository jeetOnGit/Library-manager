import Book from '../models/Book.js'

// Add single book
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, message: "Book added successfully", book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Add multiple books (bulk)
const bulkAddBooks = async (req, res) => {
  try {
    const books = req.body.books;

    const saved = await Book.insertMany(books, { ordered: false }); // continue if some fail
    res.status(201).json({
      success: true,
      message: `${saved.length} books added successfully.`,
      books: saved,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Some books may already exist", error: err.message });
  }
};

// POST /api/books/issue/:id
const issueBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.issuedCount >= book.totalCopies) {
      return res.status(400).json({ message: "No available copies" });
    }

    book.issuedCount += 1;
    book.status = (book.issuedCount === book.totalCopies) ? "not available" : "issued";
    await book.save();

    res.json({ success: true, message: "Book issued successfully", book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/books/return/:id
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || book.issuedCount <= 0) {
      return res.status(400).json({ message: "Nothing to return" });
    }

    book.issuedCount -= 1;
    book.status = (book.issuedCount === 0) ? "available" : "issued";
    await book.save();

    res.json({ success: true, message: "Book returned successfully", book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/books/delay/:id
const markDelayed = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.status = "delayed";
    await book.save();

    res.json({ success: true, message: "Book marked as delayed", book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export { addBook, bulkAddBooks, issueBook, returnBook, markDelayed }