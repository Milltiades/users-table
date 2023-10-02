import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    name: userReducer,
  },
});

export default store;
