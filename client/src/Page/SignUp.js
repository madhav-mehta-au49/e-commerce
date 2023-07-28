import React, { useState } from "react";
import usericon from "../images/icons8-login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handlePassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIL}/signup`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const dataRes = response.data;
          toast(dataRes.message);
          console.log(dataRes);
          navigate("/login");
        } catch (error) {
          if (error.response && error.response.status === 409) {
            // Email is already registered
            toast("Email is already registered");
          } else {
            // Other error occurred
            console.error(error);
          }
        }
      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("please enter a required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex item-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>SignUp</h1> */}

        <img src={usericon} alt="" className="m-auto p-3 " />

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <lable htmlFor="firstName">First Name</lable>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 border-none outline-none px-2 py-1 rounded"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <lable htmlFor="lastName">Last Name</lable>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 border-none outline-none px-2 py-1 rounded"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <lable htmlFor="email">Email</lable>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 border-none outline-none px-2 py-1 rounded"
            value={data.email}
            onChange={handleOnChange}
          />

          <lable htmlFor="password">Password</lable>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl " onClick={handlePassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <lable htmlFor="confirmPassword">confirm Password</lable>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span className="flex text-xl " onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className=" m-auto mt-4 rounded-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm">
          Already Have Account ?{" "}
          <Link to={"/login"} className="text-blue-600 font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
