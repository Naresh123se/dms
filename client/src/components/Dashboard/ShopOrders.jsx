import { useEffect, useState } from "react";
import { useGetOrdersShopQuery } from "@/app/slices/orderApiSlice";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";

const ShopOrders = () => {
  const { data, refetch } = useGetOrdersShopQuery();
  const orders = Array.isArray(data?.orders) ? [...data.orders].reverse() : [];

  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const nav = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const tabs = [
    { id: "all", label: "All", count: orders.length },
    {
      id: "pending",
      label: "Pending",
      count: orders.filter((o) => o.status === "pending").length,
    },
    { id: "to-ship", label: "To Ship", count: null },
    { id: "to-receive", label: "To Receive", count: null },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.isDelivered).length,
    },
  ];

  const filters = ["All Orders", "Last 30 Days", "Last 6 Months", "Last Year"];

  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "pending":
        return order.status === "pending";
      case "to-ship":
        return order.status === "processing" && !order.isDelivered;
      case "to-receive":
        return order.status === "shipped" && !order.isDelivered;
      case "delivered":
        return order.isDelivered;
      default:
        return true;
    }
  });

  const getFilteredByTime = (orderList) => {
    const now = new Date();
    return orderList.filter((order) => {
      const orderDate = new Date(order.createdAt);
      switch (selectedFilter) {
        case "Last 30 Days":
          return now - orderDate <= 30 * 24 * 60 * 60 * 1000;
        case "Last 6 Months":
          return now - orderDate <= 6 * 30 * 24 * 60 * 60 * 1000;
        case "Last Year":
          return now - orderDate <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
  };

  const displayOrders = getFilteredByTime(filteredOrders);

  return (
    <div className=" bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Orders</h1>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 relative focus:outline-none ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center">
          <span className="mr-3 text-gray-600">Show:</span>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
        <ScrollArea className="h-[calc(100vh-360px)]">
          {displayOrders.length > 0 ? (
            displayOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md border p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "text-yellow-700 bg-yellow-100"
                        : order.isDelivered
                        ? "text-green-700 bg-green-100"
                        : "text-blue-700 bg-blue-100"
                    }`}
                  >
                    {order.status}
                    {order.isDelivered ? " (Delivered)" : ""}
                  </span>
                </div>

                <div className="space-y-6">
                  {order.orderItems?.map((item) => (
                    <div key={item?._id} className="flex gap-6">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {item?.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Payment: {order.paymentMethod}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-gray-900 font-medium">
                            ₹{item?.price?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Tax</p>
                          <p className="text-gray-900">
                            ₹{order.taxPrice.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-gray-900 font-semibold">
                            ₹{order.totalPrice.toFixed(2)}
                          </p>
                        </div>

                        <div className="col-span-2 md:col-span-4">
                          <p className="text-sm text-gray-500">
                            Quantity: {item?.qty}
                          </p>
                          <hr className="my-2" />
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500 ">
                              Shipping Address:
                            </p>
                            <p className="text-gray-900">
                              {order.shippingAddress.address},{" "}
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.postalCode},{" "}
                              {order.shippingAddress.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md border p-8 text-center flex flex-col text-gray-500 gap-3">
              <p>There are no orders placed yet.</p>

              <p>
                <Button onClick={() => nav("/dashboard")}>
                  CONTINUE SHOPPING
                </Button>
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ShopOrders;
