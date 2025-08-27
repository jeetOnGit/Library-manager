import React, { useContext, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "signup") {
        const { data } = await axios.post(backendUrl + "/api/users/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          toast.success("Registration successful! Please login.");
          setState("login"); 
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/users/login", {
          password,
          email,
        },
          {
            withCredentials: true
          });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/dashboard");

        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#e4eaef] h-screen flex justify-center items-center">
      <div className="bg-[#fff] w-[500px] h-fit text-center py-3 rounded-md">
        <div className="">
          <i className="fa-solid fa-book-open text-bgprimary text-4xl"></i>
          <div className="py-2">
            <h4 className="font-semibold text-3xl text-txtprimary">
              Welcome to the library
            </h4>
            <p className="text-txtsecondary text-[0.9rem]">
              Please enter your details to start
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="w-[80%] text-left mx-auto my-3 flex flex-col justify-between gap-3"
        >
          {state === "signup" && (
            <div className="">
              <p className="text-txtprimary">Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full py-1 ps-2 focus:outline-none"
                type="text"
                placeholder="Your name here..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="">
            <p className="text-txtprimary">Email</p>
            <input
              className="border border-zinc-300 rounded w-full py-1 ps-2 focus:outline-none"
              type="email"
              placeholder="Your email here..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="">
            <p className="text-txtprimary">Password</p>
            <input
              className="border border-zinc-300 rounded w-full py-1 ps-2 focus:outline-none"
              type="password"
              placeholder="Your password here..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="bg-bgprimary text-white w-full py-2 rounded-md text-base mt-3"
          >
            {state === "signup" ? "Create Account" : "Login"}
          </button>
          {state === "signup" ? (
            <p>
              Already have an account?
              <span
                onClick={() => setState("login")}
                className="text-bgprimary underline cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Create a new account?
              <span
                onClick={() => setState("signup")}
                className="text-bgprimary underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </form>

        <div></div>
      </div>
    </div>
  );
};

export default Login;
