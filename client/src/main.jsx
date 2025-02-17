import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Register, Activate, Dashboard,  } from "./components";
import { StrictMode } from "react";
import AuthLayout from "./routes/AuthLayout";

import { HomePage, DashboardPage , SupplierPage, AddSupplierPage} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/activate",
        element: (
          <AuthLayout authentication={false}>
            <Activate />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={false}>
            <DashboardPage />
          </AuthLayout>
        ),
      },
      {
        path: "/suppliers",
        element: (
          <AuthLayout authentication={false}>
            <SupplierPage />
          </AuthLayout>
        ),
      },




      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      //   children: [
      //     // {
      //     //   index: "dashboard",
      //     //   element: (
      //     //       <AdminLayout>
      //     //         <AdminDashboard />
      //     //       </AdminLayout>
              
      //     //   ),
      //     // }, // Default admin dashboard
      //     // {
      //     //   path: "all-users",
      //     //   element: (
      //     //   <AdminLayout>
      //     //     <AdminAllUsers />
      //     //   </AdminLayout>
      //     // ),
      //     // }, //  admin All Users Management
      //     {
      //       path: "all-appointments",
      //       element: <AdminAllUsers />,
      //     }, // Default admin dashboard
      //     {
      //       path: "all-dentists",
      //       element: (
      //         <AdminLayout>
      //           <AdminAllDentists />
      //         </AdminLayout>
      //       ),
      //     }, // Default admin dashboard
      //     {
      //       path: "add-dentist",
      //       element: (
      //         <AdminLayout>
      //           <AdminAddDentist />
      //         </AdminLayout>
      //       ),
      //     }, // Default admin dashboard
      //   ],
      // },



      {
        path: "/suppliers/add-supplier",
        element: (
          <AuthLayout authentication={false}>
            <AddSupplierPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
