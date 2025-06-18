import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/logout");
  };

  return (
    <div className="flex justify-around items-center">
      <div>Home</div>

      <button className="flex justify-between items-center gap-3 border px-3 py-1 rounded hover:bg-bgprimary hover:text-white" onClick={logout}>
        <i className="fa-solid fa-arrow-right-to-bracket" />
        <p className="font-medium">Log Out</p>
      </button>
    </div>
  );
};

export default Home;
