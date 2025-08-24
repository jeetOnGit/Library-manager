import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const MyBooks = () => {
  const [books] = useState([
    { id: 1, title: "Book One", author: "Author A" },
    { id: 2, title: "Book Two", author: "Author B" },
    { id: 3, title: "Book Three", author: "Author C" },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleShowQR = (book) => {
    setSelectedBook(book);
  };

  const handleCloseQR = () => {
    setSelectedBook(null);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
          <button
            onClick={() => handleShowQR(book)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Show QR
          </button>
        </div>
      ))}

      {/* Popup Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl relative w-80">
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedBook.title}
            </h2>
            <div className="flex justify-center">
              <QRCodeCanvas value={`book-${selectedBook.id}`} size={150} />
            </div>
            <button
              onClick={handleCloseQR}
              className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
