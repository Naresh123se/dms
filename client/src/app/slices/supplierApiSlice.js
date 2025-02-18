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
      query: (id) => ({
        url: `${supplier_url}/${id}`,
        method: "PUT",
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
    getSingleSupplier: builder.query({
      query: ( id) => ({
        url: `${supplier_url}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddSupplierMutation,
  useGetAllSupplierQuery,
  useGetSingleSupplierQuery,
  useEditSupplierMutation,
} = supplierApiSlice;
