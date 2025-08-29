import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/Appcontext";

const ReadingHistory = () => {
  const { myRequests, fetchMyRequests, reBorrowBook, loading } = useContext(AppContext);

    if (loading) {
    return <p>Loading data....</p>
  }
  // useEffect(() => {
  //   fetchMyRequests();
  // }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📚 My Reading History</h1>

      {myRequests.length === 0 ? (
        <p className="text-gray-500">No Data Found.</p>
      ) : (
        <div className="grid gap-4">
          {myRequests.map((book) => {
            const status = book.status; // pending | approved | returned | rejected
            const isReBorrowable = status === "returned" || status === "rejected";

            return (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{book.book.title}</h2>
                  <p className="text-sm text-gray-600">by {book.book.author}</p>
                  <p className="text-xs text-gray-500">
                    Due Date:{" "}
                    {new Date(
                      new Date(book.borrowedAt).setDate(
                        new Date(book.borrowedAt).getDate() + 7
                      )
                    ).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                  <p className="text-xs mt-1">
                    Status:{" "}
                    <span
                      className={
                        status === "returned"
                          ? "text-green-600"
                          : status === "pending"
                          ? "text-yellow-600"
                          : status === "approved"
                          ? "text-blue-600"
                          : "text-red-600"
                      }
                    >
                      {status}
                    </span>
                  </p>
                </div>

                {isReBorrowable ? (
                  <button
                    onClick={() => reBorrowBook(book.book._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Re-Borrow
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  >
                    Not Re-borrowable
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadingHistory;
