import React, { useEffect } from "react";
import OrderCard from '../Orders/OrderCard'
import { useGetOrdersShopQuery } from "@/app/slices/orderApiSlice";
const ShopOrders = () => {
  const { data, refetch } = useGetOrdersShopQuery();
  let orders = Array.isArray(data?.orders) ? data.orders : [];
  orders = [...orders].reverse();
  useEffect(() =>{
    refetch()
  },[])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and track all your orders in one place
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopOrders;
