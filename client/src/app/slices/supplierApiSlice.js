import { supplier_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSupplier: builder.mutation({
      query: (data) => ({
        url: `${supplier_url}/add-distributor`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    editSupplier: builder.mutation({
      query: (id, ...data) => ({
        url: `${supplier_url}/edit-distributor/${id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllSupplier: builder.query({
      query: (data) => ({
        url: `${supplier_url}/`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useAddSupplierMutation, useGetAllSupplierQuery , useEditSupplierMutation} =
  supplierApiSlice;
