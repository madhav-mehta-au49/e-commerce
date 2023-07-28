import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../Redux/productSlice";
import { useDispatch } from "react-redux";

function CardFeature({ image, name, price, category, loading, id }) {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[240px] max-w-[200px] m-2 h-70 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <img className="p-5 rounded-t-lg h-40 m-auto" src={image} alt="" />

            <div className="px-5 pb-5">
              <h4 className="text-2xl capitalize font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                {name}
              </h4>
              <h6 className=" font-semibold capitalize tracking-tight text-gray-600 text-center">
                {category}
              </h6>

              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-black text-center">
                  <span className="text-[rgb(255,46,43)]">₹</span>
                  {price}
                </h4>
              </div>
            </div>
          </Link>
          <div className="flex justify-center">
            <button
              type="button"
              class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mb-3"
              onClick={handleAddCartProduct}
            >
              Add To Cart
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[280px]">
          <p>{loading}</p>
        </div>
      )}
    </div>
    // <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
    //   {image ? (
    //     <>
    //       <Link
    //         to={`/menu/${id}`}
    //         onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
    //       >
    //         <div className="h-28 flex flex-col justify-center items-center">
    //           <img src={image} className="h-full" />
    //         </div>
    //         <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
    //           {name}
    //         </h3>
    //         <p className=" text-slate-500  font-medium">{category}</p>
    //         <p className=" font-bold">
    //           <span className="text-red-500">₹</span>
    //           <span>{price}</span>
    //         </p>
    //       </Link>
    //       <button
    //         className="bg-[#FF9119] hover:bg-[#FF9119]/80 py-1 mt-2 rounded w-full"
    //         onClick={handleAddCartProduct}
    //       >
    //         Add Cart
    //       </button>
    //     </>
    //   ) : (
    //     <div className="min-h-[150px] flex justify-center items-center">
    //       <p>{loading}</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default CardFeature;
