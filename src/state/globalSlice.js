import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  // userId for inital login assuming this a user which has logged in
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// We can use curly braces to send a spcific function or variable from GlobalSlice

export const { setMode } = globalSlice.actions; // Actions

export default globalSlice.reducer;
