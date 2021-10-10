import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Slices/authSlice";
const rootReducer = {
  auth: AuthReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
