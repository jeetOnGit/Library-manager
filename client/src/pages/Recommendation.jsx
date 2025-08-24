// src/pages/Recommendations.jsx
import React from "react";

const recommendedBooks = [
  {
    id: 1,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "https://covers.openlibrary.org/b/id/9259250-L.jpg",
    category: "Business",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/id/9259251-L.jpg",
    category: "Self-Improvement",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "https://covers.openlibrary.org/b/id/9648642-L.jpg",
    category: "Programming",
  },
];

const Recommendations = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Recommended for You</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="h-48 w-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <span className="text-sm mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {book.category}
            </span>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Borrow
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
