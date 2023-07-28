import React from "react";
import HomeCards from "../component/HomeCards";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useRef } from "react";
import AllProduct from "../component/AllProduct";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(3, 7);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetables",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(16).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  // filter

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full my-3">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fasted Delivery in{" "}
            <span className="text-[rgb(255,46,43)] text-">Your Home</span>
          </h2>
          <p className="py-3 text-lg font-semibold ">
            Welcome to a{" "}
            <span className="text-[rgb(255,46,43)] text-xl font-bold">
              Super Grocery
            </span>{" "}
            Indulge in Flavors Galore! Discover a delectable world of
            gastronomic delights at our one-stop e-commerce food emporium. Savor
            the artistry of gourmet cuisine, tantalizing your taste buds with a
            diverse array of delectable treats.
          </p>
          <button
            onClick={() => navigate("/menu/64b7bdc79d0431530efabc46")}
            className="font-bold bg-[rgb(255,46,43)] text-slate-200 px-4 py-2 rounded-md my-5 mr-10 "
          >
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 ml-10 flex flex-wrap gap-5">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCards
                    image={el.image}
                    id={el._id}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCards key={index + "loading"} loading={"loading..."} />
                );
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4 ">
            <button
              onClick={preveProduct}
              className="text-xl bg-slate-300 hover:bg-slate-400 p-1 rounded"
            >
              <AiFillCaretLeft />
            </button>
            <button
              onClick={nextProduct}
              className="text-xl bg-slate-300 hover:bg-slate-400 p-1 rounded"
            >
              <AiFillCaretRight />
            </button>
          </div>
        </div>
        <div
          className="flex overflow-scroll scrollbar-none scroll-smooth transition-all "
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
    </div>
  );
}

export default Home;
