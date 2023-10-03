import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import userReducer1 from "./nameSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    name: userReducer1
  },
});

export default store;
