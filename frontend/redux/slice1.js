import { createSlice } from "@reduxjs/toolkit";

const slicer1 = createSlice({
  name: "slice1",
  initialState: { darkMode: true, isLoading: true, isAuthenticated: false },
  reducers: {
    toggleDarkMode: (state) => {state.darkMode = !state.darkMode},
    toggleLoading: (state) => {state.isLoading = !state.isLoading},
    toggleAuthenticated: (state) => { state.isAuthenticated = !state.isAuthenticated},
  },    
});

export default slicer1.reducer;

export const  {
 toggleDarkMode,
toggleLoading,
toggleAuthenticated
} = slicer1.actions;