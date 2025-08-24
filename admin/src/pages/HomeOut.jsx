import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import Sidebar from '../components/Sidebar'
const HomeOut = () => {
  const navigate = useNavigate();
const { token } = useContext(AppContext);



  return (
    <>
      <nav className="bg-white px-6 py-4 border border-b">
        <div className="container-xl mx-auto">
          <div className="navBar flex justify-between items-center">
            <div
              className="flex justify-between items-center gap-3 cursor-pointer"
              title="BooksEra"
            >
              <i className="fa-solid fa-book-open text-bgprimary text-4xl" />
              <p className="text-2xl font-semibold text-txtprimary">BooksEra</p>
            </div>
            <div className="relative w-1/3 max-[678px]:hidden">
              <i className="fa-solid fa-magnifying-glass absolute left-2 top-3" />
              <input
                className="border w-full ps-8 py-2 focus:outline-none rounded "
                type="text"
                placeholder="Search books, author or subjects..."
              />
            </div>
            <div>
              <button
                className="flex justify-between items-center gap-3 border px-3 py-1 rounded hover:bg-bgprimary hover:text-white"
                onClick={() => navigate("/login")}
              >
                <i className="fa-solid fa-arrow-right-to-bracket" />
                <p className="font-medium">Sign Up</p>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-white">
        <div className="container-xl mx-auto">
          <section className="h-[550px] bg-[#f4f8fd] flex flex-col justify-center items-center gap-6">
            <div className="w-[600px] text-center max-[978px]:w-fit">
              <h1 className="text-6xl font-bold text-txtprimary">
                Your Campus Library,{" "}
                <span className="text-[#465c72]">Reimagined</span>
              </h1>
            </div>
            <div className="w-[600px] text-center max-[978px]:w-fit">
              <p className="text-txtsecondary">
                Access thousands of books instantly with our modern digital
                platform. No more waiting in lines or searching through shelves.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="border px-8 py-2 bg-bgprimary text-white rounded hover:scale-110"
                onClick={() => navigate("/login")}
              >
                Browse Books{" "}
                <span>
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </button>
              <button className="border px-8 py-2 rounded">Learn More</button>
            </div>
          </section>

          <section className="">
            <div className="container-xl mx-auto">
              <div className="secHeading w-fit text-center mx-auto my-16">
                <h4 className="text-txtprimary text-3xl font-bold">
                  Why Choose CampusBooks
                </h4>
                <p className="text-txtsecondary text-sm">
                  A modern approach to campus library management designed for
                  today's students.
                </p>
              </div>

              <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#465c721a] w-16 h-16 flex justify-center items-center mx-auto group-hover:bg-[#465c7233] rounded">
                    <i className="fa-solid fa-bolt text-2xl" />
                  </div>
                  <h6 className="text-txtprimary text-xl font-semibold my-3">
                    Instant Access
                  </h6>
                  <p className="text-txtsecondary">
                    Find and borrow books instantly with our streamlined digital
                    platform.
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#465c721a] w-16 h-16 flex justify-center items-center mx-auto group-hover:bg-[#465c7233] rounded">
                    <i className="fa-solid fa-magnifying-glass text-2xl" />
                  </div>
                  <h6 className="text-txtprimary text-xl font-semibold my-3">
                    Smart Search
                  </h6>
                  <p className="text-txtsecondary">
                    Advanced search capabilities help you find exactly what you
                    need.
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#465c721a] w-16 h-16 flex justify-center items-center mx-auto group-hover:bg-[#465c7233] rounded">
                    <i className="fa-solid fa-clock text-2xl" />
                  </div>
                  <h6 className="text-txtprimary text-xl font-semibold my-3">
                    24/7 Available
                  </h6>
                  <p className="text-txtsecondary">
                    Access your digital library anytime, anywhere on campus.
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#465c721a] w-16 h-16 flex justify-center items-center mx-auto group-hover:bg-[#465c7233] rounded">
                    <i className="fa-solid fa-user-group text-2xl" />
                  </div>
                  <h6 className="text-txtprimary text-xl font-semibold my-3">
                    Community Driven
                  </h6>
                  <p className="text-txtsecondary">
                    Connect with fellow students and discover popular reads.
                  </p>
                </div>
              </div>

              <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-40">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <h6 className="text-4xl lg:text-5xl font-bold text-txtprimary mb-2">
                    10,000+
                  </h6>
                  <p className="text-txtsecondary">Books A text-lgvailable</p>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <h6 className="text-4xl lg:text-5xl font-bold text-txtprimary mb-2">
                    2500+
                  </h6>
                  <p className="text-txtsecondary">Active text-lgStudents</p>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <h6 className="text-4xl lg:text-5xl font-bold text-txtprimary mb-2">
                    99.9%
                  </h6>
                  <p className="text-txtsecondary text-lg">Uptime</p>
                </div>
              </div>

              <div className="secHeading w-fit text-center mx-auto my-16">
                <h4 className="text-txtprimary text-3xl font-bold">
                  Ready to Get Started?
                </h4>
                <p className="text-txtsecondary text-sm mt-3 mb-7">
                  Join thousands of students who have already transformed their
                  study experience.
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    className="border px-8 py-2 bg-bgprimary text-white rounded hover:scale-110"
                    onClick={() => navigate("/login")}
                  >
                    Start Browsing
                    <span>
                      <i className="fa-solid fa-arrow-right ms-2" />
                    </span>
                  </button>
                  <button className="border px-8 py-2 rounded">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default HomeOut;
