import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";

const Profile = () => {
  const {user} = useContext(AppContext)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-6 bg-white shadow rounded-xl p-6">
        <img
          src="public/user.jpg"
          alt="user"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          {/* <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1> */}
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500 text-sm">
            {/* Roll No: {user.roll} • Course: {user.course} */}
          </p>
        </div>
      </div>


      {/* Quick Links */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/my-books"
            className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
          >
            📚 My Books {user.borrowedBooks.length}
          </a>
          <a
            href="/history"
            className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
          >
            🕒 Reading History
          </a>
          <a
            href="/favourites"
            className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
          >
            ❤️ Favourites{user.favourites.length}
          </a>
          <a
            href="/recommendations"
            className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
          >
            🤖 Recommendations
          </a>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
        <div className="space-y-3 mt-3">
          <button className="w-full text-left p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition">
            ✏️ Edit Profile
          </button>
          <button className="w-full text-left p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition">
            🔒 Change Password
          </button>
          <button className="w-full text-left p-4 bg-white rounded-xl shadow hover:bg-red-50 transition text-red-600">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   {user.email}
    // </div>
  );
};

export default Profile;
