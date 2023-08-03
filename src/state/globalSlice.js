import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initially we are using dark theme in reducers
  mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // we are getting the value "dark" in the "state" parameter from Initial state
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions; // Actions

export default globalSlice.reducer;
