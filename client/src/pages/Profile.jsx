import React from "react";

const Profile = () => {
  const user = {
    name: "Jeet Das",
    email: "jeet@example.com",
    roll: "20231045",
    course: "B.Com",
    avatar: "https://i.pravatar.cc/150?img=12",
    stats: {
      borrowed: 5,
      favourites: 8,
      history: 12,
      recommendations: 6,
    },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-6 bg-white shadow rounded-xl p-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500 text-sm">
            Roll No: {user.roll} • Course: {user.course}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Object.entries(user.stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-blue-50 shadow rounded-xl p-4 text-center hover:scale-105 transition"
          >
            <p className="text-xl font-bold text-blue-600">{value}</p>
            <p className="capitalize text-gray-600">{key}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/my-books"
            className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
          >
            📚 My Books
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
            ❤️ Favourites
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
  );
};

export default Profile;
