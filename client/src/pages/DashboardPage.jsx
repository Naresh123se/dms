import { Dashboard, Sidebar } from "../components";

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full">

      <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
