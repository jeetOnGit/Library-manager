import React, { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Email</span>
              <span className="font-medium">student@email.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Password</span>
              <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Appearance</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
