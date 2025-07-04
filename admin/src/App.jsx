import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomeOut from "./pages/HomeOut";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Home />} />
        <Route path="/booksMgmt" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
