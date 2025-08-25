import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext = createContext();

const Appcontextprovider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null)
  const [borrowedRequest, setBorrowedRequest] = useState([])
  const [history, setHistory] = useState([])
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
      setBorrowedRequest(res.data.user.borrowedBooks);
      setHistory(res.data.user.history || []);
      setFavBooks(res.data.user.favourites || []);

    } catch (error) {
      console.error("Failed to load profile", error);
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
    history,
    setHistory,
    favBooks,
    setFavBooks,
    fetchProfile
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default Appcontextprovider;
