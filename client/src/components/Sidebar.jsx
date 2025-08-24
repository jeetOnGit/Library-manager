import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Sidebar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  // helper to check active tab
  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#e5e7eb] font-semibold text-bgprimary"
      : "hover:bg-[#f2f3f5]";

  return (
    <div className="w-1/5 border-r h-screen justify-between max-[1000px]:w-fit flex flex-col  fixed bg-white">
      {/* Logo */}
      <div>
        <div
          className="flex items-center cursor-pointer gap-1 py-3 border-b px-3"
          title="BooksEra"
        >
          <i className="fa-solid fa-book-open text-bgprimary text-2xl mt-1" />
          <p className="text-2xl font-semibold text-txtprimary max-[1000px]:hidden">
            BooksEra
          </p>
        </div>

        {/* Navigation */}
        <div className="navigation border-b text-start">
          <p className="text-txtsecondary text-xs py-2 px-3">Navigation</p>
          <ul className="text-txtprimary flex flex-col">
            <li className={`${isActive("/Dashboard")} px-3 py-2 rounded`}>
              <Link to="/Dashboard">
                <i className="fa-solid fa-house" />{" "}
                <span className="max-[1000px]:hidden">Dashboard</span>
              </Link>
            </li>
            <li className={`${isActive("/browse-books")} px-3 py-2 rounded`}>
              <Link to="/browse-books">
                <i className="fa-solid fa-magnifying-glass" />{" "}
                <span className="max-[1000px]:hidden">Browse Books</span>
              </Link>
            </li>
            <li className={`${isActive("/my-books")} px-3 py-2 rounded`}>
              <Link to="/my-books">
                <i className="fa-solid fa-book" />{" "}
                <span className="max-[1000px]:hidden">My Books</span>
              </Link>
            </li>
            <li className={`${isActive("/history")} px-3 py-2 rounded`}>
              <Link to="/history">
                <i className="fa-solid fa-clock" />{" "}
                <span className="max-[1000px]:hidden">Reading History</span>
              </Link>
            </li>
            <li className={`${isActive("/favourites")} px-3 py-2 rounded`}>
              <Link to="/favourites">
                <i className="fa-solid fa-heart" />{" "}
                <span className="max-[1000px]:hidden">Favourites</span>
              </Link>
            </li>
            <li className={`${isActive("/recommendations")} px-3 py-2 rounded`}>
              <Link to="/recommendations">
                <i className="fa-solid fa-star" />{" "}
                <span className="max-[1000px]:hidden">Recommendations</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="account text-start">
          <p className="text-txtsecondary text-xs py-2 px-3">Account</p>
          <ul className="text-txtprimary flex flex-col">
            <li className={`${isActive("/my-profile")} px-3 py-2 rounded`}>
              <Link to="/my-profile">
                <i className="fa-solid fa-user" />{" "}
                <span className="max-[1000px]:hidden">Profile</span>
              </Link>
            </li>
            <li className={`${isActive("/settings")} px-3 py-2 rounded`}>
              <Link to="/settings">
                <i className="fa-solid fa-gear" />{" "}
                <span className="max-[1000px]:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>


      {/* Logout */}
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
