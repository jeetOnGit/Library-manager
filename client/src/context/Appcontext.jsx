import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const Appcontextprovider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken && savedToken !== "false" && savedToken !== "null"
      ? savedToken
      : "";
  });

  const value = {
    backendUrl,
    token,
    setToken,
    currencySymbol
  };

  //    useEffect(() => {
  //         if (token) {
  //           loadUserData().catch(() => {
  //             localStorage.removeItem('token');
  //             setToken(false);

  //             toast.error('Session expired. Please login again.');
  //           });
  //         } else {
  //         //   setUserData(false);
  //         }
  //       }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default Appcontextprovider;
