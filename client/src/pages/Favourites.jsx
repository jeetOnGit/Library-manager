import React, { useState } from "react";

const Favourites = () => {
  // Dummy data (in real app, fetch from backend or database)
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      available: false,
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://covers.openlibrary.org/b/id/10958382-L.jpg",
      available: true,
    },
  ]);

  // Handle re-borrow (move from wishlist to borrow)
  const handleBorrow = (id) => {
    alert(`Borrow request sent for book ID: ${id}`);
    // Here you would call backend API to borrow book
    // and remove from wishlist if successful
  };

  // Remove from wishlist
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((book) => book.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Favourites (Wishlist)</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">No books in your wishlist yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="h-40 w-auto mb-4 rounded"
              />
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              {book.available ? (
                <button
                  onClick={() => handleBorrow(book.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2"
                >
                  Borrow Now
                </button>
              ) : (
                <p className="text-red-500 mb-2">Out of Stock</p>
              )}

              <button
                onClick={() => handleRemove(book.id)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
