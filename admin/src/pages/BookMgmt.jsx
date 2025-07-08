import React from 'react'

const BookMgmt = () => {
  return (
    <div className='px-2 py-3'>
      <div>
        <p className='text-txtsecondary'>Showing 88 results</p>
        <button>Add Book</button>
      </div>
      <div>
        <input type="text" placeholder='Search books by name, author or subject' />
      </div>

      <table className='table-auto border border-slate-500 w-full text-center'>
        <thead>
          <tr className='border-b border-slate-600'>
          <th className=''>Title</th>
          <th className=''>Author</th>
          <th className=''>Subject</th>
          <th className=''>Location</th>
          <th className=''>Status</th>
          <th className=''>Due Date</th>
          <th className=''>Actions</th>
        </tr>
        </thead>
        

        <tr>
          <td>Introduction to Algorithms</td>
          <td>Thomas H. Cormen</td>
          <td>Computer Science</td>
          <td>CS Library - Shelf A3</td>
          <td>available</td>
          <td>-</td>
          <td>
            <button>+</button>
            <button>D</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default BookMgmt