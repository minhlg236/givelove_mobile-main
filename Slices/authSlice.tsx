import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    login(state) {
      // bình thường xài action payload mới cần dùng đến action
      return (state = true);
    },
    logout(state) {
      return (state = false);
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions; //name export
export default reducer; //default export
