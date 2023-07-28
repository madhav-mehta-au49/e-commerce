import React from "react";
import { Link } from "react-router-dom";

function HomeCards({ name, image, category, price, loading, id }) {
  return (
    <div className="w-60 h-70 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {name ? (
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
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[280px]">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}

export default HomeCards;
