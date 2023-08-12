// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Categories = createApi({
  reducerPath: "Categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/category`,
    credentials: "include",
  }),
  tagTypes: ["Categories"], // Set your API base URL
  endpoints: (builder) => ({
    // Register endpoint

    getProductCategories: builder.query({
      query: () => ({
        url: `/get`, // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
 useGetProductCategoriesQuery
} = Categories; // Export hooks for mutations
