import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../images/cart.jpg";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

function Cart() {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productCartItem),
      });
      if (res.statusCode === 500) return;

      const data = await res.json();

      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
   
    <div className="p-2 md:p-4 ">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600 text-center mt-4 ">
        Your Cart items
      </h2>
      {productCartItem[0] ? (
        <div className="my-1 flex flex-col gap-3 md:flex-row">
          <div className="w-full md:w-1/2">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  price={el.price}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                />
              );
            })}
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0 mx-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg font-bold text-center mt-3">
              Summary
            </h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total qty</p>
              <p className="ml-auto w-20 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-20 font-bold">
                <span className="text-red-500 ">₹</span>
                {totalPrice}
              </p>
            </div>
            <button
              type="submit"
              onClick={handlePayment}
              className="bg-[rgb(255,46,43)] w-full text-lg font-bold py-2 text-white mt-4"
            >
              Payment
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center items-center flex-col ">
            <img
              src={emptyCartImage}
              className="w-full max-w-sm my-2"
              alt="Empty Cart"
            />
            <p className="text-slate-800 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
