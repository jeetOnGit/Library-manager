import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HomeOut from "./pages/HomeOut";
import { ToastContainer } from "react-toastify";
import BookMgmt from "./pages/BookMgmt";
import { AppContext } from "./context/Appcontext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./pages/UserMgmt";
import Requests from "./pages/Requests";

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
          <Route path="/" element={token ? <Dashboard /> : <HomeOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/books-management" element={<BookMgmt />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
