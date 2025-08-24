import React, { useContext, useEffect, useState } from 'react'
import BookFormModal from '../components/BookFormModal'
import { AppContext } from '../context/Appcontext';
import axios from 'axios';

const BookMgmt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { backendUrl, token } = useContext(AppContext)
  const [allBooks, setAllBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("");



  const handleAddBook = async (bookData) => {
    // send bookData to backend
    try {
      const res = await fetch(`${backendUrl}/api/books/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookData)
      });
      const data = await res.json();
      fetchBooks()
      console.log("Book added:", data);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };


  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/books/all-books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setAllBooks(res.data.books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${backendUrl}/api/books/${id}`);
      setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const filteredBooks = allBooks.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term)
    );
  });
  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className='px-2 py-3'>
      <div className='flex justify-between items-center'>
        <p className='text-txtsecondary'>Showing {allBooks.length} results</p>
        <button className='bg-bgprimary text-white py-2 px-4' onClick={() => setIsModalOpen(true)}>Add Book</button>
        <BookFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBook}
        />
      </div>
      <div>

        <input className='border w-[70%] ps-2 py-2 my-3 rounded focus:outline-none'
          type="text"
          placeholder="Search book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='bg-bgprimary text-white py-2 px-6 ms-2'>Search</button>
        <button className='border text-black py-2 px-6 ms-2 hover:bg-bgprimary hover:text-white' onClick={() => fetchBooks()}>Refresh</button>
      </div>

      <table className='table-auto border border-slate-500 w-full text-center'>
        <thead>
          <tr className='border-b border-slate-600'>
            <th className=''>Title</th>
            <th className=''>Author</th>
            <th className=''>Publisher</th>
            <th className=''>Location</th>
            <th className=''>Status</th>
            <th className=''>Total Copies</th>
            <th className=''>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className='border'>
              <td className='py-2'>{book.title}</td>
              <td className='py-2'>{book.author}</td>
              <td className='py-2'>{book.publisher}</td>
              <td className='py-2'>{book.location}</td>
              <td className='py-2'>{book.status}</td>
              <td className='py-2'>{book.copies}</td>
              <td className='py-2'>
                <button
                  className='text-white bg-red-600 px-3'
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>



      </table>
    </div>
  )
}

export default BookMgmt