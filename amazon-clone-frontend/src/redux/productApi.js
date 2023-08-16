// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Product = createApi({
  reducerPath: "Product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Product"], // Set your API base URL
  endpoints: (builder) => ({
    // Register endpoint
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/create", // Replace with your actual register endpoint
        method: "POST",
        body: productData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Register endpoint
    updateProduct: builder.mutation({
      query: (productData) => ({
        url: `/update/${productData.id}`, // Replace with your actual register endpoint
        method: "PUT",
        body: productData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Login endpoint

    getProduct: builder.query({
      query: (userData) => ({
        url: "/get", // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    getAllProduct: builder.query({
      query: (userData) => ({
        url: "/get-all", // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/get-details/${id}`, // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    getProductCategories: builder.query({
      query: (id) => ({
        url: `/get-details/${id}`, // Replace with your actual login endpoint
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),

    getProductByFilter: builder.query({
      query: ({
        keyword = "",
        currentPage = 1,
        category,
        price = [0,0],
        rating = 0,
        sort,
      }) => {
        let link = `/get?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}`;

        if (category) {
          link = `/get?keyword=${keyword}&page=${currentPage}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}`;
        }
        if (rating) {
          link = `/get?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}`;
        }

        return link;
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductQuery,useCreateProductMutation,useGetProductQuery,useGetProductDetailsQuery,useUpdateProductMutation,useGetProductByFilterQuery } = Product; // Export hooks for mutations
