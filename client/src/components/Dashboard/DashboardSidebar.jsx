import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";

const DashboardSidebar = () => {
  return (
    <div className="w-64 h-screen p-5 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-8">DMS Dashboard</h2>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <Home />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <ShoppingCart />
          <span>Orders</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <Package />
          <span>Inventory</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <Users />
          <span>Customers</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <LineChart />
          <span>Reports</span>
        </a>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
