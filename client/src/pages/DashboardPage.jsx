import { Sidebar, AdminNav } from "../components";
import { Outlet } from "react-router-dom";
const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <AdminNav/>
      <div className=" w-full">
      <Outlet/>
      </div>
    </div>
  );
}; 

export default DashboardPage;
