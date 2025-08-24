import express from 'express'
const BookRouter = express.Router();
import { addBook, bulkAddBooks, issueBook, returnBook, markDelayed, getAllBooks, deleteBook } from "../controllers/BookController.js";

// POST routes
BookRouter.post("/add", addBook);             // Manual form
BookRouter.post("/bulk", bulkAddBooks);       // Bulk table
BookRouter.post("/issue/:id", issueBook);
BookRouter.post("/return/:id", returnBook);
BookRouter.post("/delay/:id", markDelayed);


BookRouter.delete("/:id", deleteBook);

// GET routes
BookRouter.get("/all-books", getAllBooks);

export default BookRouter
