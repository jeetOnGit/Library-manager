import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const Appcontextprovider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') || false);

  const value = {
    backendUrl,
    token,
    setToken
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
