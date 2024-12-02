import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice.js";
import postReducer from "../Features/PostSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postReducer,
  },
});
