import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const Appcontextprovider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [borrowedRequest, setBorrowedRequest] = useState([])
  
  const [token, setToken] = useState(() => {
      const savedToken = localStorage.getItem("token");
      return savedToken && savedToken !== "false" && savedToken !== "null"
        ? savedToken
        : "";
    });
  

  
  // Function to fetch all books from the API
  const fetchAllBooks = async () => {
    try {
      // setIsLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/pending-requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setBorrowedRequest(res.data);
      
    } catch (error) {
      toast.error("Failed to fetch books.");
      console.error("Fetch books error:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const approveBorrowRequest = async (borrowId) => {
    try {
      await axios.patch(`${backendUrl}/api/admin/approve/${borrowId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // For instant UI feedback, remove the approved request from the context state
      setBorrowedRequest(prev => prev.filter(req => req._id !== borrowId));
      toast.success("Request approved!");
    } catch (error) {
      console.error("Failed to approve request", error);
      toast.error(error.response?.data?.message || "Action failed.");
      throw error;
    }
  };

  const rejectBorrowRequest = async (borrowId) => {
    try {
      await axios.patch(`${backendUrl}/api/admin/reject/${borrowId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // For instant UI feedback, remove the rejected request from the context state
      setBorrowedRequest(prev => prev.filter(req => req._id !== borrowId));
      toast.warn("Request rejected!");
    } catch (error)      {
      console.error("Failed to reject request", error);
      toast.error(error.response?.data?.message || "Action failed.");
      throw error;
    }
  };
useEffect(() => {
    if (token) {
      fetchAllBooks();
    } else {
      setUser(null);
    }
  }, [token]);



  const value = {
    backendUrl,
    token,
    setToken,
    borrowedRequest,
    fetchAllBooks,
    setBorrowedRequest,
    approveBorrowRequest,
    rejectBorrowRequest,
  };



  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default Appcontextprovider;
