import React, { useState, useEffect, useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { AppContext } from "../context/Appcontext";

const MyBooks = () => {
  const { myRequests, fetchMyRequests, returnBook } = useContext(AppContext);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchMyRequests();
    // console.log(myRequests[0].status);

  }, []);

  const handleShowQR = (request) => {
    setSelectedBook(request);
  };

  const handleCloseQR = () => {
    setSelectedBook(null);
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {myRequests.map((req) => (
        <div
          key={req._id}
          className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center"
        >
          <img
            src={"https://placehold.co/150x200"}
            alt={req.book?.title}
            className="w-32 h-44 object-cover mb-3 rounded"
          />
          <h2 className="text-lg font-semibold">{req.book?.title}</h2>
          <p className="text-gray-600">{req.book?.author}</p>
          <span
            className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusColors[req.status]
              }`}
          >
            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
          </span>
          <button
            onClick={() => handleShowQR(req)}
            disabled={req.status !== "approved"}
            className={`mt-3 px-4 py-2 rounded-lg transition ${req.status === "approved"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Show QR
          </button>

          {req.status === "approved" && (
            <button
              onClick={() => returnBook(req._id)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-blue-600 transition"
            >
              Return Book
            </button>
          )}
        </div>
      ))}

      {/* Popup Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl relative w-80">
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedBook.book?.title}
            </h2>
            <div className="flex justify-center">
              <QRCodeCanvas
                value={`borrow-${selectedBook._id}`} // 🔑 unique borrow ID
                size={150}
              />
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
