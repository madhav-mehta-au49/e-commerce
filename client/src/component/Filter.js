import { ImSpoonKnife } from "react-icons/im";
import React from "react";

function Filter({ category, onClick, isActive }) {
  return (
    <div onClick={onClick}>
      <div
        className={`text-xl p-5 mx-2 rounded-full cursor-pointer ${
          isActive
            ? "bg-[rgb(255,46,43)] text-white"
            : "bg-[#FF9119] hover:bg-[#FF9119]/80"
        }`}
      >
        <ImSpoonKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
}

export default Filter;
