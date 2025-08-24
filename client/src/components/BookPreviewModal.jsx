import React from "react";

const BookPreviewModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Book Cover */}
        <img
          src={book.coverImage || "https://placehold.co/200x200"}
          alt={book.title}
          className="w-full h-64 object-cover rounded mb-4"
        />

        {/* Title & Author */}
        <h2 className="text-2xl font-semibold mb-1">{book.title}</h2>
        <p className="text-gray-600 mb-3">by {book.author}</p>

        {/* Category & Stock */}
        <p className="text-sm text-gray-500 mb-2">
          Category: {book.genre || "N/A"}
        </p>
        <p
          className={`mb-4 text-sm font-medium ${
            book.copies > 3
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

        {/* Description */}
        <p className="text-gray-700 mb-4">
          {book.description || "No description available."}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            disabled={book.copies === 0}
            className={`flex-1 px-3 py-2 rounded text-white ${
              book.copies === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
