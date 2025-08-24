import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";

export default function BookFormModal({ isOpen, onClose, onSuccess }) {
  const { backendUrl, token } = useContext(AppContext);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    year: "",
    genre: "",
    language: "",
    copies: 1,
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/books/add`,
        bookData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.success("Book added successfully!");
        onSuccess?.();
        setBookData({
          title: "",
          author: "",
          isbn: "",
          publisher: "",
          year: "",
          genre: "",
          language: "",
          copies: 1,
          location: ""
        });
        onClose();
      } else {
        toast.error(res.data.message || "Failed to add book");
      }
    } catch (error) {
      toast.error("Error adding book");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title", placeholder: "Title", required: true },
            { name: "author", placeholder: "Author", required: true },
            { name: "isbn", placeholder: "ISBN" },
            { name: "publisher", placeholder: "Publisher" },
            { name: "year", placeholder: "Year" },
            { name: "location", placeholder: "Location" },
            { name: "genre", placeholder: "Genre" },
            { name: "language", placeholder: "Language" },
          ].map(({ name, placeholder, required }) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={bookData[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required={required}
            />
          ))}

          <input
            type="number"
            name="copies"
            placeholder="Total Copies"
            value={bookData.copies}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={1}
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
