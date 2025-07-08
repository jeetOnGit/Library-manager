import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Sidebar = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };
  return (
    <div className="w-1/5 border-r h-screen max-[1000px]:w-fit flex flex-col justify-between fixed bg-white">
      <div
        className="flex items-center cursor-pointer gap-1 py-3 border-b px-3"
        title="BooksEra"
      >
        <i className="fa-solid fa-book-open text-bgprimary text-2xl mt-1" />
        <p className="text-2xl font-semibold text-txtprimary max-[1000px]:hidden">
          BooksEra
        </p>
      </div>

      <div className="navigation border-b text-start">
        <p className="text-txtsecondary text-xs py-2 px-3">Navigation</p>
        <ul className="text-txtprimary flex flex-col">
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/Dashboard'>
              <i className="fa-solid fa-house" />{" "}
              <span className="max-[1000px]:hidden">Dashboard</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/browse-books'>
              <i className="fa-solid fa-magnifying-glass" />{" "}
              <span className="max-[1000px]:hidden">Browse Books</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/my-books'>
              <i className="fa-solid fa-book" />{" "}
              <span className="max-[1000px]:hidden">My Books</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/history'>
              <i className="fa-solid fa-clock" />{" "}
              <span className="max-[1000px]:hidden">Reading History</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/favourites'>
              <i className="fa-solid fa-heart" />{" "}
              <span className="max-[1000px]:hidden">Favourites</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link to='/recommendations'>
              <i className="fa-solid fa-star" />{" "}
              <span className="max-[1000px]:hidden">Recommendations</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="account text-start">
        <p className="text-txtsecondary text-xs py-2 px-3">Account</p>
        <ul className="text-txtprimary flex flex-col">
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link>
              <i className="fa-solid fa-user" />{" "}
              <span className="max-[1000px]:hidden">Profile</span>
            </Link>
          </li>
          <li className="hover:bg-[#f2f3f5] px-3 py-2">
            <Link>
              <i className="fa-solid fa-gear" />{" "}
              <span className="max-[1000px]:hidden">Settings</span>
            </Link>
          </li>
        </ul>
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
