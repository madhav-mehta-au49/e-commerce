import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDatProduct: (state, action) => {
      console.log(action);
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      console.log(check);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("items Add success");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      console.log(action.payload);
      toast("one Item delete");
      const index = state.cartItem.indexOf((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    incresaQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;
      const price = state.cartItem[index].price;
      const total = price * qtyInc;
      state.cartItem[index].total = total;
    },
    decreseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;
        const price = state.cartItem[index].price;
        const total = price * qtyDec;
        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDatProduct,
  addCartItem,
  deleteCartItem,
  incresaQty,
  decreseQty,
} = productSlice.actions;

export default productSlice.reducer;
