import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, incresaQty, decreseQty } from "../Redux/productSlice";

function CartProduct({ id, name, image, price, category, qty, total }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 shadow p-2 flex gap-4 my-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:p-4">
      <div className="bg-white  p-3  rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover p-3" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500  "
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500 ">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => dispatch(incresaQty(id))}
              className="bg-slate-300 hover:bg-slate-400 py-1 mt-2 rounded p-1  "
            >
              <BiPlus />
            </button>
            <p className="font-semibold p-1 mt-2">{qty}</p>
            <button
              onClick={() => dispatch(decreseQty(id))}
              className="bg-slate-300 hover:bg-slate-400 py-1 mt-2 rounded  p-1"
            >
              <BiMinus />
            </button>
          </div>
          <div className="flex item-center gap-2 font-bold text-slate-700 ">
            <p>Total :</p>
            <p>
              <span className="text-red-500 ">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
