import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext = createContext();

const Appcontextprovider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null)
  const [borrowedRequest, setBorrowedRequest] = useState([])
  const [myRequests, setMyRequests] = useState([]);
  // const [history, setHistory] = useState([])
  const [favBooks, setFavBooks] = useState([])

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken && savedToken !== "false" && savedToken !== "null"
      ? savedToken
      : "";
  });

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/users/me`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setFavBooks(res.data.user.favourites || []);
      setBorrowedRequest(res.data.user.borrowRequests || []);

    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const fetchMyRequests = async () => {
  try {
    const res = await axios.get(`${backendUrl}/api/users/my-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyRequests(res.data);

  } catch (error) {
    toast.error("Failed to fetch your books.");
    console.error("Fetch my books error:", error);
  }
};

// This function now correctly calls the updated backend route
const borrowBook = async (bookId) => {
  try {
    const res = await axios.post(
      `${backendUrl}/api/users/borrow-book/${bookId}`, // ✅ Changed: Removed user._id from URL
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update context state with the new pending request
    setBorrowedRequest((prev) => [...prev, res.data.borrow]);
    
    return res.data;
  } catch (error) {
    console.error("Failed to borrow book", error);
    throw error;
  }
};


const withdrawRequest = async (bookId) => {
    try {
      // The user is identified by the token, so we don't need user._id in the URL
      await axios.delete(
        `${backendUrl}/api/users/withdraw-request/${bookId}`, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the request from our state
      setBorrowedRequest((prev) => prev.filter((req) => req.book !== bookId));
    } catch (error) {
      console.error("Failed to withdraw request", error);
      throw error;
    }
};

const returnBook = async (bookId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/users/return-book/${bookId}`, 
        {}, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the returned book from the active list
      setBorrowedRequest((prev) => prev.filter((req) => req.book !== bookId));
      return res.data;
    } catch (error) {
      console.error("Failed to return book", error);
      throw error;
    }
};

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  
  if (!user) {
    return <p>Loading profile...</p>; // 👈 Prevents crash
  }


  const value = {
    backendUrl,
    token,
    setToken,
    currencySymbol,
    user,
    setUser,
    borrowedRequest,
    setBorrowedRequest,
    borrowBook,
    withdrawRequest,
    returnBook,
    fetchMyRequests,
    myRequests,
    favBooks,
    setFavBooks,
    fetchProfile
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default Appcontextprovider;
