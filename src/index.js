import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { configureStore } from "@reduxjs/toolkit";
// We are able to fetch state directly from folder with mentioning the full path because we've defined the base url in jsconfig.json file
import globalReducer from "state/globalSlice";
import { Provider } from "react-redux";

// Setting up the store and wrapping the whole with provider we are doing both things in file previoulsy we created separate file for defining "store"

const store = configureStore({
  reducer: {
    globalCustom: globalReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
