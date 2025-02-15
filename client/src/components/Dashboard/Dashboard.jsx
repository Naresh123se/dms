import React, { useState } from "react";
import {
  BarChart3,
  Box,
  Clock,
  Package,
  Truck,
  Users,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Bell,
  Settings,
  Filter,
  Download,
  Boxes,
  Building2,
  ChevronRight,
  LayoutDashboard,
  CircleDollarSign,
  LineChart,
  Warehouse,
} from "lucide-react";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between z-10 backdrop-blur-sm bg-white/90">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, shipments, customers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-4">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-lg shadow-blue-200">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <Box className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            DistriHub
          </h1>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, text: "Dashboard", active: true },
              { icon: Package, text: "Inventory" },
              { icon: Truck, text: "Shipments" },
              { icon: Users, text: "Customers" },
              { icon: Warehouse, text: "Warehouses" },
              { icon: Building2, text: "Suppliers" },
              { icon: CircleDollarSign, text: "Finance" },
              { icon: LineChart, text: "Analytics" },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.text}</span>
                </div>
                {item.active && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Dashboard Overview
            </h2>
            <p className="text-gray-600">
              Welcome back, Admin! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-4 w-4" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Orders",
              value: "2,451",
              change: "+12.5%",
              isPositive: true,
              icon: Package,
              color: "blue",
            },
            {
              title: "Active Shipments",
              value: "145",
              change: "+8.2%",
              isPositive: true,
              icon: Truck,
              color: "green",
            },
            {
              title: "Pending Deliveries",
              value: "48",
              change: "-2.4%",
              isPositive: false,
              icon: Clock,
              color: "yellow",
            },
            {
              title: "Customer Issues",
              value: "5",
              change: "-18.3%",
              isPositive: true,
              icon: AlertCircle,
              color: "red",
            },
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 ring-2 ring-${stat.color}-100 ring-offset-2`}
                >
                  <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
                <span
                  className={`flex items-center text-sm font-medium px-2 py-1 rounded-lg ${
                    stat.isPositive
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  {stat.change}
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1" />
                  )}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Recent Activity
              </h3>
              <button className="text-blue-600 text-sm hover:text-blue-700 font-medium flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "New order #45678",
                  description: "Order placed by John Doe",
                  time: "5 minutes ago",
                  icon: Package,
                  color: "blue",
                },
                {
                  title: "Shipment Delivered",
                  description: "Order #45623 successfully delivered",
                  time: "1 hour ago",
                  icon: Truck,
                  color: "green",
                },
                {
                  title: "Customer Support",
                  description: "New ticket from Sarah Smith",
                  time: "2 hours ago",
                  icon: Users,
                  color: "yellow",
                },
                {
                  title: "Low Stock Alert",
                  description: "Product SKU-123 is running low",
                  time: "3 hours ago",
                  icon: AlertCircle,
                  color: "red",
                },
              ].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br from-${activity.color}-50 to-${activity.color}-100`}
                  >
                    <activity.icon
                      className={`h-5 w-5 text-${activity.color}-500`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 mb-0.5">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Package, text: "New Order", color: "blue" },
                { icon: Truck, text: "Track Shipment", color: "green" },
                { icon: Users, text: "Add Customer", color: "purple" },
                { icon: AlertCircle, text: "Report Issue", color: "red" },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`quick-action-btn border-${action.color}-100 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100/30`}
                >
                  <action.icon className={`h-6 w-6 text-${action.color}-500`} />
                  <span className="text-sm font-medium text-gray-700">
                    {action.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
