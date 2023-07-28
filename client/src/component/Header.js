import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../Redux/userSlice";
import { toast } from "react-hot-toast";
import logo from "../images/logo2.png";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="max-h-20 w-34 -mt-8" />
          </div>
        </Link>
        <div className="flex item-center gap-4 md:gap-7">
          <nav className=" gap-5 md:gap-6 text-base md:text m-2.5 hidden md:flex">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[rgb(255,46,43)] px-2 rounded-full pt-0.5 text-center font-semibold text-white"
                  : ""
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[rgb(255,46,43)] px-2 rounded-full pt-0.5 text-center font-semibold text-white"
                  : ""
              }
              to={"/menu/64b7bdc79d0431530efabc46"}
            >
              Menu
            </NavLink>
          </nav>
          <div className="text-2xl text-slate-600 relative m-2.5">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1.5 -right-1 text-white bg-orange-600 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-2xl text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer">
              {userData.firstName ? (
                <button className=" text-xs m-2 font-semibold uppercase bg-blue-500 text-white py-2 px-4 border border-blue-700 rounded">
                  {userData.firstName}
                </button>
              ) : (
                <HiOutlineUserCircle className="m-2" />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-3 px-2 shadow drop-shadow-md flex flex-col">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproducts"}
                    className="gap-5 md:gap-6 text-base md:text m-auto flex flex-col font-bold md text-orange-600"
                  >
                    New Product
                  </Link>
                )}
                {userData.email === process.env.REACT_APP_ADMIN_1_EMAIL && (
                  <Link
                    to={"newproducts"}
                    className="gap-5 md:gap-6 text-base md:text m-auto flex flex-col font-bold md text-orange-600"
                  >
                    New Product
                  </Link>
                )}

                {userData.firstName ? (
                  <p
                    className="gap-5 md:gap-6 my-3 text-base md:text m-auto flex flex-col font-bold md text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="gap-5 md:gap-6 text-base md:text m-auto flex flex-col font-bold md text-orange-600 mb-3"
                  >
                    Login
                  </Link>
                )}
                <nav className=" gap-5 md:gap-3 text-base md:text  flex flex-col font-bold text-center">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/menu/64b7bdc79d0431530efabc46"}>Menu</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
