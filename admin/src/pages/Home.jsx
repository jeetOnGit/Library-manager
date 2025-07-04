import React from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <>
      <div>
          <div className="flex justify-start">
            <Sidebar />
            <Dashboard />
          </div>
      </div>
    </>
  );
};

export default Home;
