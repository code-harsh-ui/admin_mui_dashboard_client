import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//! and we are exporting "api" the whole function as well and both thing we are going to use in "index.js" file
export const api = createApi({
  // baseUrl is defined in .env.local file in root directory not that port should be same as backend port (5001) and the baseUrl is http://localhost:5001
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
    }),
  }),
});

//! Note that we are exporting the callback function from "api"
export const { useGetUserQuery } = api;
