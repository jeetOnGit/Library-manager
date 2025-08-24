import React, { useState, useEffect } from "react";

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);

  // Fetch history (simulate API for now)
  useEffect(() => {
    const sampleHistory = [
      {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        returnedDate: "2025-08-10",
      },
      {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        returnedDate: "2025-07-28",
      },
      {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        returnedDate: "2025-07-15",
      },
    ];
    setHistory(sampleHistory);
  }, []);

  // Re-borrow function (for now just alert, later call API)
  const handleReBorrow = (bookId) => {
    alert(`Re-borrowed book with ID: ${bookId}`);
    // Example for backend:
    // fetch(`/api/reborrow/${bookId}`, { method: "POST" })
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📚 My Reading History</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No history found.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-xs text-gray-500">
                  Returned on: {book.returnedDate}
                </p>
              </div>
              <button
                onClick={() => handleReBorrow(book.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Re-Borrow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingHistory;
