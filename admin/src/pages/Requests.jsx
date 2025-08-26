import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Requests = () => {
  const { borrowedRequest, approveBorrowRequest, rejectBorrowRequest } = useContext(AppContext);
  
const handleUpdateStatus = (borrowId, bookTitle, action) => {
    if (action === 'approve') {
      approveBorrowRequest(borrowId); // This function now handles the API call, state update, and toast
    } else {
      rejectBorrowRequest(borrowId); // This function now handles the API call, state update, and toast
    }
  };

  // Sort requests to show pending ones first
  const sortedRequests = [...borrowedRequest].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0;
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">My Borrow Requests</h1>

      {sortedRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You have no active or pending requests.</p>
          <Link to="/admin-dashboard" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            Back to dashboard
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRequests.map((request) => {
            const isPending = request.status === 'pending';
            const statusBgColor = isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
            
            return (
              <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="p-4 flex gap-4">
                  <img 
                    src={request.book?.coverImage || 'https://placehold.co/100x150'} 
                    alt={request.book?.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-1">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBgColor}`}>
                      {isPending ? 'Pending Approval' : 'Approved'}
                    </span>
                    <h2 className="text-lg font-bold mt-2 text-gray-900">{request.book?.title || 'Book title not available'}</h2>
                    <p className="text-sm text-gray-600">by {request.book?.author || 'N/A'}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Requested on: {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-auto p-4 bg-gray-50 flex gap-3">
                   <button 
                    onClick={() => handleUpdateStatus(request._id, request.book?.title, 'approve')}
                    className={`w-full py-2 text-white font-semibold rounded-md transition-colors bg-green-600`}
                  >
                    Approve
                  </button>
                  <button
                  onClick={() => handleUpdateStatus(request._id, request.book?.title, 'reject')}
                  className={`w-full py-2 text-white font-semibold rounded-md transition-colors bg-red-600`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;

