import express from 'express'
const BookRouter = express.Router();
import { addBook, bulkAddBooks, issueBook, returnBook, markDelayed } from "../controllers/BookController.js";

BookRouter.post("/add", addBook);             // Manual form
BookRouter.post("/bulk", bulkAddBooks);       // Bulk table
BookRouter.post("/issue/:id", issueBook);
BookRouter.post("/return/:id", returnBook);
BookRouter.post("/delay/:id", markDelayed);

export default BookRouter
