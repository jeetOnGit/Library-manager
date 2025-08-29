import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";

const Favourites = () => {
  const {user, removeFavourite, fetchProfile} = useContext(AppContext)

useEffect(()=>{
fetchProfile();
}, [user])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Favourites (Wishlist)</h1>

      {user.favourites.length === 0 ? (
        <p className="text-gray-600">No books in your wishlist yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.favourites.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={"https://placehold.co/150x200"}
                alt={book.title}
                className="h-40 w-auto mb-4 rounded"
              />
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              {book.available ? (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2"
                >
                  Borrow Now
                </button>
              ) : (
                <p className="text-red-500 mb-2">Out of Stock</p>
              )}

              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                onClick={()=> removeFavourite(user._id, book._id)}
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
