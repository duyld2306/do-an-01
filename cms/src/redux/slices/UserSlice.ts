import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";

import { IRootState } from "../store";

export interface IAccountInfo {
  accessToken?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

const initialState: IAccountInfo = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (_, action: PayloadAction<IAccountInfo>) => {
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

const useGetUserRedux = () => {
  return useSelector((state: IRootState) => state.user);
};

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = UserSlice.actions;

export { useGetUserRedux };

export default UserSlice.reducer;
