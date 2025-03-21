import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  TruckIcon,
  BoxIcon,

  ShoppingCart,
  Users,

} from "lucide-react";
import { useGetDistributorProfileQuery } from "@/app/slices/supplierApiSlice";

import { ChangePassword } from "../index";
import { ScrollArea } from "../ui/scroll-area";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data, isLoading } = useGetDistributorProfileQuery();
  const isFirst = data?.distributor.firstlogin;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isFirst === true) {
      setOpen(true);
    }
  }, [isFirst]);

  const dashboardCards = [
    {
      title: "Total Orders",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Inventory Value",
      value: "$142,384",
      change: "+8.2%",
      trend: "up",
      icon: BoxIcon,
    },
    {
      title: "Active Shipments",
      value: "48",
      change: "-3.1%",
      trend: "down",
      icon: TruckIcon,
    },
    {
      title: "Customers",
      value: "856",
      change: "+5.3%",
      trend: "up",
      icon: Users,
    },
  ];

  const [orders] = useState([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: "Tech Solutions Inc.",
      status: "in-transit",
      destination: "New York, NY",
      date: "2024-03-15",
      value: "$2,450.00",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: "Global Retail Co.",
      status: "pending",
      destination: "Los Angeles, CA",
      date: "2024-03-14",
      value: "$1,875.00",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customer: "Smart Devices Ltd.",
      status: "delivered",
      destination: "Chicago, IL",
      date: "2024-03-13",
      value: "$3,200.00",
    },
  ]);

  const [inventory] = useState([
    {
      id: "1",
      name: "Premium Laptop",
      sku: "LAP-PRO-001",
      quantity: 45,
      location: "Warehouse A",
      status: "in-stock",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      sku: "ACC-HEAD-002",
      quantity: 12,
      location: "Warehouse B",
      status: "low-stock",
    },
    {
      id: "3",
      name: "Smart Watch",
      sku: "WAT-SMT-003",
      quantity: 0,
      location: "Warehouse A",
      status: "out-of-stock",
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-transit": "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      "in-stock": "bg-green-100 text-green-800",
      "low-stock": "bg-yellow-100 text-yellow-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className=" bg-gray-50">
      <ChangePassword open={open} setOpen={setOpen} />
      <ScrollArea className="flex-1 h-[calc(100vh-65px)]  ">
        <div className=" p-8">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6">
                {dashboardCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-white p-6 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <card.icon className="w-8 h-8 text-blue-600" />
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          card.trend === "up"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {card.change}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {card.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.orderNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.customer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <p className="font-medium text-gray-900">
                          {order.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders View */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-2">Order #</div>
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Destination</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Value</div>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="col-span-2 text-blue-600 font-medium">
                    {order.orderNumber}
                  </div>
                  <div className="col-span-3 text-gray-900">
                    {order.customer}
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2 text-gray-500">
                    {order.destination}
                  </div>
                  <div className="col-span-2 text-gray-500">{order.date}</div>
                  <div className="col-span-1 text-gray-900 font-medium">
                    {order.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inventory View */}
          {activeTab === "inventory" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-4">Product</div>
                <div className="col-span-2">SKU</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Status</div>
              </div>

              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="col-span-4 text-gray-900">{item.name}</div>
                  <div className="col-span-2 text-gray-500">{item.sku}</div>
                  <div className="col-span-2 text-gray-900 font-medium">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-gray-500">
                    {item.location}
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Dashboard;
