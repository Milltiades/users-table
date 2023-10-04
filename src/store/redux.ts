import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import userReducer1 from "./nameSlice";
import modalReducer from "./modalSlice"
import editReducer from "./editSlice"
import userIdReducer from "./userIdSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    name: userReducer1,
    modal: modalReducer,
    edit: editReducer,
    userid: userIdReducer
  },
});

export default store;
