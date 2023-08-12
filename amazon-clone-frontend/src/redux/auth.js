// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Auth"], // Set your API base URL
  endpoints: (builder) => ({
    // Register endpoint
    register: builder.mutation({
      query: (userData) => ({
        url: "/register", // Replace with your actual register endpoint
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    // Login endpoint
    login: builder.mutation({
      query: (userData) => ({
        url: "/login", // Replace with your actual login endpoint
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    me: builder.query({
      query: (userData) => ({
        url: "/me", // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation,useMeQuery } = auth; // Export hooks for mutations
