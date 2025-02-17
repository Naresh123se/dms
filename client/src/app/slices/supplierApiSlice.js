import {  supplier_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSupplier: builder.mutation({
      query: (data) => ({
        url: `${supplier_url}/add-distributor`,
        method: "POST",
        body: data,
        credentials: 'include'
      }),
    }),

  }),
});

export const { useAddSupplierMutation } =
  supplierApiSlice;