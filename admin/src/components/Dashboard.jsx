import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex justify-between px-3 py-4 border-b">
          <h4 className="text-2xl font-semibold">Dashboard</h4>

          <button className="flex justify-between items-center gap-3 border px-3 py-1 hover:bg-bgprimary hover:text-white">
            <i className="fa-solid fa-bell" />
          </button>
        </div>

        {/* <section className="py-6">
          <div className="flex flex-col justify-between items-start rounded px-3 py-6 bg-[#f2f3f5] mx-2">
            <h5 className="text-3xl font-bold">Welcome back, Admin!</h5>
            <p className="text-txtsecondary my-4">
              You have 2 books currently borrowed and 2 recommendations waiting
              for you.
            </p>
            <button className="bg-bgprimary text-white px-4 py-2 rounded">
              Browse Books <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </section> */}

        <section className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-3">
            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Total Students</li>
                <li>
                  <i className="fa-solid fa-book-open text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">1250</li>
                <li className="text-xs text-txtsecondary">
                  +12% from last month
                </li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Total Books</li>
                <li>
                  <i className="fa-solid fa-clock text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">15000</li>
                <li className="text-xs text-txtsecondary">+5% from last month</li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Borrowed Books</li>
                <li>
                  <i class="fa-solid fa-arrow-up-long text-txtprimary rotate-45" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">1200</li>
                <li className="text-xs text-txtsecondary">+8% from last month</li>
              </ul>
            </div>

            <div className="border px-3 py-4 rounded flex flex-col gap-3">
              <ul className="flex justify-between">
                <li>Overdue Books</li>
                <li>
                  <i className="fa-solid fa-star text-txtprimary" />
                </li>
              </ul>
              <ul>
                <li className="text-3xl font-bold">24</li>
                <li className="text-xs text-txtsecondary">-3% from last month</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 py-4 px-3 gap-6">
            <div className="border px-2 py-2 rounded">
              <h4 className="text-2xl">
                Recent Users
              </h4>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex justify-between items-center border rounded py-4 px-3">
                  <div>
                    <h6 className="font-semibold">
                      John Smith
                    </h6>
                    <p className="text-xs text-txtsecondary">john.smith@university.edu</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2">Active</p>
                  </div>
                </div>

                <div className="flex justify-between items-center border rounded py-2 px-3">
                  <div>
                    <h6 className="font-semibold">
                      Emily Johnson
                    </h6>
                    <p className="text-xs text-txtsecondary">emily.j@university.edu</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2  bg-red-600 text-white">Suspended</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border px-2 py-2 rounded">
              <h4 className="text-2xl">
                Book Status Alert
              </h4>
              <div className="flex justify-between items-center border rounded py-4 px-3">
                  <div>
                    <h6 className="font-semibold">
                      Introduction to Psychology
                    </h6>
                    <p className="text-xs text-txtsecondary">7 available of 15</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2">Available</p>
                  </div>
              </div>

              <div className="flex justify-between items-center border rounded py-4 px-3">
                  <div>
                    <h6 className="font-semibold">
                      Calculus: Early Transcendentals
                    </h6>
                    <p className="text-xs text-txtsecondary">1 available of 15</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2">Low Stock</p>
                  </div>
              </div>

                <div className="flex justify-between items-center border rounded py-2 px-3">
                  <div>
                    <h6 className="font-semibold">
                     Organic Chemistry
                    </h6>
                    <p className="text-xs text-txtsecondary">0 Available</p>
                  </div>

                  <div>
                    <p className="border rounded-full px-2  bg-red-600 text-white">Out of Stock</p>
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
