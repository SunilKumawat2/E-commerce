import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isError: false,
    isLoading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
          isError: false,
        };
      },
      logout: (state) => {
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isError: false,
        };
      },
      // Additional actions for loading and error handling can be added here
    },
  });
  
export const { setUser, logout } = authSlice.actions;
export default authSlice;