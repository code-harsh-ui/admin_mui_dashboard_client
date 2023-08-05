import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state/globalSlice";
import { Provider } from "react-redux";
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
