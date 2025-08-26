import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Sidebar = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };
  return (
    <div className="w-1/5 border-r h-screen max-[1000px]:w-fit flex flex-col justify-between fixed bg-white">
      <div className="">
        <div
          className="flex items-center cursor-pointer gap-1 py-3 border-b px-3"
          title="BooksEra"
        >
          <i className="fa-solid fa-book-open text-bgprimary text-2xl mt-1" />
          <p className="text-2xl font-semibold text-txtprimary max-[1000px]:hidden">
            Admin Panel
          </p>
        </div>

        <div className="navigation border-b text-start">
          <p className="text-txtsecondary text-xs py-2 px-3">Management</p>
          <ul className="text-txtprimary flex flex-col">
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/admin-dashboard">
                <i className="fa-solid fa-house" />{" "}
                <span className="max-[1000px]:hidden">Overview</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/user-management">
                <i className="fa-solid fa-users" />{" "}
                <span className="max-[1000px]:hidden">User Management</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/books-management">
                <i className="fa-solid fa-swatchbook" />{" "}
                <span className="max-[1000px]:hidden">Books Management</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/requests">
                <i className="fa-solid fa-swatchbook" />{" "}
                <span className="max-[1000px]:hidden">Requests</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/analytics">
                <i className="fa-solid fa-chart-simple" />{" "}
                <span className="max-[1000px]:hidden">Analytics</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/reports">
                <i className="fa-solid fa-file" />{" "}
                <span className="max-[1000px]:hidden">Reports</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/alerts">
                <i className="fa-solid fa-triangle-exclamation" />{" "}
                <span className="max-[1000px]:hidden">System Alerts</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="account text-start">
          <p className="text-txtsecondary text-xs py-2 px-3">System</p>
          <ul className="text-txtprimary flex flex-col">
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/database">
                <i className="fa-solid fa-database" />{" "}
                <span className="max-[1000px]:hidden">Database</span>
              </Link>
            </li>
            <li className="hover:bg-[#f2f3f5] px-3 py-2">
              <Link to="/settings">
                <i className="fa-solid fa-gear" />{" "}
                <span className="max-[1000px]:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex items-center gap-3 border-t px-3 py-1 cursor-pointer hover:bg-[#f2f3f5]"
        onClick={logout}
      >
        <i className="fa-solid fa-arrow-right-to-bracket" />
        <p className="font-medium max-[1000px]:hidden">Sign Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
