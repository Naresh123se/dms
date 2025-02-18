import { product_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${product_url}/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    editProduct: builder.mutation({
      query: (id) => ({
        url: `${product_url}/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getAllProduct: builder.query({
      query: (data) => ({
        url: `${product_url}/`,
        method: "GET",
        body: data,
      }),
    }),
    getSingleProduct: builder.query({
      query: ( id) => ({
        url: `${product_url}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
useAddProductMutation,
useEditProductMutation,
useGetAllProductQuery,
useGetSingleProductQuery
} = productApiSlice;
