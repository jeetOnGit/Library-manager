import React, { useContext } from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HomeOut from "./pages/HomeOut";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BrowsePage from "./pages/BrowsePage";
import { AppContext } from "./context/Appcontext";
import MyBooks from "./pages/MyBooks";
import ReadingHistory from "./pages/ReadingHistory";
import Favourites from "./pages/Favourites";
import Recommendations from "./pages/Recommendation";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse-books" element={<BrowsePage />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/history" element={<ReadingHistory />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
