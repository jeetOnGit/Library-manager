import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HomeOut from "./pages/HomeOut";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BrowsePage from "./pages/BrowsePage";
import { AppContext } from "./context/Appcontext";

function App() {
  const { token } = useContext(AppContext);

  return (
    <div className="flex">
      <ToastContainer />
      {token && <Sidebar />}
      <div
        className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${
          token ? "ml-[20%] max-[1000px]:ml-0" : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomeOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse-books" element={<BrowsePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
