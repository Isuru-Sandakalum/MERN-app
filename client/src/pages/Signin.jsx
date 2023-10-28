import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillSketchCircle,
  AiFillTwitterSquare,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  //set form data
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="py-8">
      <div className=" mt-8 mx-auto items-center justify-center shadow-lg w-fit p-2">
        <h1 className=" text-4xl text-center p-8 mb-10 font-bold">Sign In</h1>

        <h1 className=" text-sm sm:text-xl lg:text-2xl text-center">
          <span className="text-primary font-bold">Build</span>
          <span className="font-bold">You</span>
        </h1>
        <p className=" text-white/40 text-sm text-center justify-center">
          Continue your work & new properties are available now
        </p>
        <p className=" text-white/40 text-sm text-center justify-center">
          Sign in here.
        </p>

        <ul className=" flex items-center justify-center gap-4 p-2 mt-5">
          <li>
            <AiFillFacebook size={25}></AiFillFacebook>
          </li>
          <li>
            <AiFillInstagram size={25}></AiFillInstagram>
          </li>
          <li>
            <AiFillTwitterSquare size={25}></AiFillTwitterSquare>
          </li>
          <li>
            <AiFillSketchCircle size={25}></AiFillSketchCircle>
          </li>
        </ul>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mx-auto p-3 w-[400px] sm:w-[800px]"
        >
          <input
            id="email"
            onChange={handleChange}
            type="email"
            placeholder="email@.com"
            className=" p-3 rounded-md focus:outline-none bg-black"
          ></input>
          <input
            id="password"
            onChange={handleChange}
            type="password"
            placeholder="password"
            className=" p-3 rounded-md focus:outline-none bg-black"
          ></input>

          <button
            disabled={loading}
            className=" bg-primary rounded-md py-2 px-8 items-center text-black font-semibold mx-auto disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <OAuth></OAuth>
          <p className=" text-white/40 text-sm text-center justify-center">
            Don't have an account ?{" "}
            <a href="/sign-up" className=" text-blue-700 underline">
              Create an account
            </a>
          </p>
        </form>
      </div>
      <div className="text-center font-bold">
        {error && <p className=" text-red-700 mt-5">{error}</p>}
      </div>
    </div>
  );
}
