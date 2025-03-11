import { order_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${order_url}/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getOrdersShop: builder.query({
      query: () => ({
        url: `${order_url}/get-orders/shop`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getOrdersDistributor: builder.query({
      query: () => ({
        url: `${order_url}/`,
        method: "GET",
        body: data,
        credentials: "include",
      }),
    }),
    getOrdersAdmin: builder.query({
      query: (id) => ({
        url: `${product_url}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersShopQuery
} = productApiSlice;
