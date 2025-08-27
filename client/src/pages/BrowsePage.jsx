import React, { useState, useEffect, useContext, useMemo } from "react";
import { AppContext } from "../context/Appcontext";
import BookPreviewModal from "../components/BookPreviewModal";
import axios from "axios";
import { toast } from "react-toastify";


const BrowseBooks = () => {
  const { backendUrl, borrowedRequest, borrowBook, withdrawRequest, returnBook } = useContext(AppContext);
  const [qrImage, setQrImage] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const booksPerPage = 8;

  useEffect(() => {

    axios.get(`${backendUrl}/api/books/all-books`)
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setBooks(data);
        } else if (Array.isArray(data.books)) {
          setBooks(data.books);
        }
      })
      .catch(err => console.error(err));
  }, [backendUrl]);

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title?.toLowerCase().includes(search.toLowerCase()) ||
          book.author?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          category === "All" || book.genre === category;
        const matchesAvailability =
          availability === "All" ||
          (availability === "Available" && book.copies > 3) ||
          (availability === "Low Stock" && book.copies > 0 && book.copies <= 3) ||
          (availability === "Out of Stock" && book.copies === 0);
        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "Title") return a.title.localeCompare(b.title);
        if (sortBy === "Author") return a.author.localeCompare(b.author);
        return 0;
      });
  }, [books, search, category, availability, sortBy]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);



  const handleBookAction = async (book, status) => {
    try {
      switch (status) {
        case 'pending':
          await withdrawRequest(book._id);
          toast.info(`Request for "${book.title}" has been withdrawn.`);
          // When a request is withdrawn, optimistically restore the copy count
          setBooks(prev => prev.map(b => b._id === book._id ? { ...b, copies: b.copies + 1 } : b));
          break;
        case 'approved':
          await returnBook(book._id);
          toast.success(`"${book.title}" returned successfully!`);
          // When a book is returned, optimistically restore the copy count
          setBooks(prev => prev.map(b => b._id === book._id ? { ...b, copies: b.copies + 1 } : b));
          break;
        default: // 'null' or any other case means we are creating a new request
          await borrowBook(book._id);
          toast.success(`Request for "${book.title}" sent for approval.`);
          // When a request is made, optimistically decrement the copy count
          setBooks(prev => prev.map(b => b._id === book._id ? { ...b, copies: b.copies - 1 } : b));
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Self Help">Self Help</option>
          <option value="History">History</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Availability</option>
          <option value="Available">Available</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="Newest">Newest</option>
          <option value="Title">Title (A-Z)</option>
          <option value="Author">Author (A-Z)</option>
        </select>
      </div>

      {/* Book Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => { 
            
            const userRequest = borrowedRequest.find(req => req.book === book._id);
            const requestStatus = userRequest ? userRequest.status : null;

            // Set button properties based on the status
            let buttonText = "Borrow";
            let buttonClass = "bg-blue-500 hover:bg-blue-600";
            let isDisabled = book.copies === 0 && !requestStatus;

            if (requestStatus === 'pending') {
              buttonText = "Withdraw";
              buttonClass = "bg-yellow-500 hover:bg-yellow-600";
            } else if (requestStatus === 'approved') {
              buttonText = "Return";
              buttonClass = "bg-red-500 hover:bg-red-600";
            }

            // ✅ ADD THE 'return' KEYWORD HERE
            return (
              <div
                key={book._id}
                className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={book.coverImage || "https://placehold.co/150x150"}
                  alt={book.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p
                  className={`mb-4 text-sm font-medium ${book.copies > 3
                    ? "text-green-600"
                    : book.copies > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                    }`}
                >
                  {book.copies > 3
                    ? "Available"
                    : book.copies > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                </p>
                <div className="mt-auto flex gap-2">
                  <button
                    disabled={isDisabled}
                    className={`flex-1 px-3 py-2 rounded text-white transition-colors ${isDisabled ? "bg-gray-400 cursor-not-allowed" : buttonClass}`}
                    onClick={() => handleBookAction(book, requestStatus)}
                  >
                    {buttonText}
                  </button>

                  <button className="flex-1 px-3 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50" onClick={() => setSelectedBook(book)}>
                    Preview
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Loading your books!
          </p>
        )}
      </div>


      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 border rounded ${currentPage === num
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      <BookPreviewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>


  );
};

export default BrowseBooks;
