import React, { useState } from "react";
import usericon from "../images/icons8-login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/userSlice";

function Login() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state);
  console.log(userData);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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

    const { email, password } = data;

    if (email && password) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIL}/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataRes = response.data;
        console.log(dataRes, "success");

        if (dataRes) {
          dispatch(loginRedux(dataRes));

          setTimeout(() => {
            navigate("/");
            toast(dataRes.message);
          }, 1000);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Email is already registered
          toast("Email is not available, please signup");
        } else {
          // Other error occurred
          console.error(error);
        }
      }
    } else {
      alert("please enter a required fields");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto mt-28  flex item-center flex-col p-4">
        <img src={usericon} alt="" className="m-auto p-3 " />

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

          <button className=" m-auto mt-4 rounded-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Don't Have Account ?{" "}
          <Link to={"/signup"} className="text-blue-600 font-bold underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
