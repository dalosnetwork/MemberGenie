import { configureStore } from "@reduxjs/toolkit";
import walletReducer  from "../features/walletdata/walletSlice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;