import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
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

  const returnBook = async (borrowId) => {
    try {
      const res = await axios.patch(
        `${backendUrl}/api/users/return/${borrowId}`,
        {}, // no body, just params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Book returned successfully");

        // Update myBooks in context
        setBorrowedRequest((prev) =>
          prev.map((b) =>
            b._id === borrowId ? { ...b, status: "returned" } : b
          )
        );
        fetchMyRequests()
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to return book");
      console.error(error);
    }
  };

  const reBorrowBook = async (bookId) => {
  try {
    const res = await axios.post(
      `${backendUrl}/api/users/borrow-book/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newBorrow = res.data.borrow;
    if (!newBorrow) throw new Error(res.data.message || "No borrow returned");

    // update borrowedRequest safely
    setBorrowedRequest((prev) => {
      const exists = prev.find(
        (req) => req.book?._id?.toString() === bookId.toString()
      );
      if (exists) {
        return prev.map((req) =>
          req.book?._id?.toString() === bookId.toString() ? newBorrow : req
        );
      }
      return [...prev, newBorrow];
    });

    toast.success("Book re-borrowed successfully!");
    fetchMyRequests();
    return newBorrow;

  } catch (err) {
    console.error("Re-borrow error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || err.message);
  }
};





  useEffect(() => {
    if (token) {
      fetchProfile();
    }else{
      setUser({name: "guest"})
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
    fetchProfile,
    reBorrowBook
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default Appcontextprovider;
