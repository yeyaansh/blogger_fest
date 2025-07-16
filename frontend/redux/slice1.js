import { createSlice } from "@reduxjs/toolkit";

const slicer1 = createSlice({
  name: "slice1",
  initialState: { darkMode: "dark", isLoading: true, isAuthenticated: false },
  reducers: {
    toggleDarkMode: (state,action) => {
     state.darkMode = action.payload;
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    toggleAuthenticated: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
});

export default slicer1.reducer;

export const { toggleDarkMode, toggleLoading, toggleAuthenticated } =
  slicer1.actions;
