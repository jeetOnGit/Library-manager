import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { backendUrl, token, setToken, user } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="flex justify-between px-3 py-4 border-b">
          <h4 className="text-2xl font-semibold">Dashboard</h4>

          <button className="flex justify-between items-center gap-3 border px-3 py-1 hover:bg-bgprimary hover:text-white">
            <i className="fa-solid fa-bell" />
          </button>
        </div>

        <section className="py-6">
          <div className="flex flex-col justify-between items-start rounded px-3 py-6 bg-[#f2f3f5] mx-2">
            <h5 className="text-3xl font-bold">Welcome back, {user.name}!</h5>
            <p className="text-txtsecondary my-4">
              You have 2 books currently borrowed and 2 recommendations waiting
              for you.
            </p>
            <button className="bg-bgprimary text-white px-4 py-2 rounded">
              <Link to='/browse-books'>Browse Books <i className="fa-solid fa-arrow-right" /></Link>
            </button>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-3">
            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Books Borrowed</li>
                <li>
                  <i className="fa-solid fa-book-open text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">2</li>
                <li className="text-xs text-txtsecondary">
                  Currently checked out
                </li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Due Soon</li>
                <li>
                  <i className="fa-solid fa-clock text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">1</li>
                <li className="text-xs text-txtsecondary">within 7 days</li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Reading Streak</li>
                <li>
                  <i class="fa-solid fa-arrow-up-long text-txtprimary rotate-45" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">12</li>
                <li className="text-xs text-txtsecondary">Days in a row</li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Books Read</li>
                <li>
                  <i className="fa-solid fa-star text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">24</li>
                <li className="text-xs text-txtsecondary">This Semester</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 py-4 px-3 gap-6">
            <div className="border px-2 py-2 rounded">
              <h4 className="text-2xl">
                <i className="fa-solid fa-book-open" /> Currently Borrowed
              </h4>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex justify-between items-center border rounded py-4 px-3">
                  <div>
                    <h6 className="font-semibold">
                      Introduction to Psychology
                    </h6>
                    <p className="text-xs text-txtsecondary">David Myers</p>
                    <p className="text-xs text-txtsecondary">Due: 2024-01-15</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2 bg-red-600 text-white">3 days left</p>
                  </div>
                </div>

                <div className="flex justify-between items-center border rounded py-2 px-3">
                  <div>
                    <h6 className="font-semibold">
                      Calculus: Early Transcendentals
                    </h6>
                    <p className="text-xs text-txtsecondary">James Stewart</p>
                    <p className="text-xs text-txtsecondary">Due: 2024-01-20</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2">8 days left</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border px-2 py-2 rounded">
              <h4 className="text-2xl">
                <i className="fa-solid fa-clock" /> Recent Activity
              </h4>
              <div className="flex flex-col gap-3 mt-4 border rounded px-3 py-3">
                <div>
                  <h6 className="">Borrowed "Data Structures and Algorithms"</h6>
                  <p className="text-xs text-txtsecondary">2 days ago</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4 border rounded px-3 py-3">
                <div>
                  <h6 className="">Returned "Linear Algebra Done Right"</h6>
                  <p className="text-xs text-txtsecondary">1 week ago</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4 border rounded px-3 py-3">
                <div>
                  <h6 className="">Reserved "Organic Chemistry"</h6>
                  <p className="text-xs text-txtsecondary">1 week ago</p>
                </div>
              </div>


            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
