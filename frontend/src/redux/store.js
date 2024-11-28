import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";
import { userReducer } from "./slice/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
