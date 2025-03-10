import { admin_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allocateDistrubitor: builder.mutation({
      query: ({ selectedSupplier: distributorId, userId }) => ({
        url: `${admin_url}/allocate-distributor`,
        method: "PUT",
        body: { distributorId, userId },
        credentials: "include",
      }),
    }),

    // editSupplier: builder.mutation({
    //   query: (data) => ({
    //     url: `${admin_url}/${data.id}`,
    //     method: "PUT",
    //     credentials: "include",
    //     body: data,
    //   }),
    // }),
    getAllocationRequest: builder.query({
      query: () => ({
        url: `${admin_url}/allocation-request`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getDistributorProfile: builder.query({
      query: () => ({
        url: `${admin_url}/distributor-profile`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `${admin_url}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useAllocateDistrubitorMutation, useGetAllocationRequestQuery } =
  supplierApiSlice;
