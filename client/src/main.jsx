import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  Activate,
  Dashboard,
  SupplierList,
  AddSupplier,
  AddProduct,
  EditSupplier,
  ProductList,
  EditProduct,
  AdminDashboard,
} from "./components";
import { StrictMode } from "react";
import AuthLayout from "./routes/AuthLayout";

import { DashboardPage, HomePage } from "./pages";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLayout from "./routes/AdminLayout";

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
        path: "/admin",
        element: <AdminDashboardPage />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "suppliers",
            element: (
              <AdminLayout>
                <SupplierList />
              </AdminLayout>
            ),
          },
          {
            path: "add-supplier",
            element: (
              <AdminLayout>
                <AddSupplier />
              </AdminLayout>
            ),
          },
          {
            path: "edit-supplier/:id",
            element: (
              <AdminLayout>
                <EditSupplier />
              </AdminLayout>
            ),
          },
          {
            path: "products",
            element: (
              <AdminLayout>
                <ProductList />
              </AdminLayout>
            ),
          },
          {
            path: "add-product",
            element: (
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            ),
          },
          {
            path: "edit-product/:id",
            element: (
              <AdminLayout>
                <EditProduct />
              </AdminLayout>
            ),
          },
        ],
      },
      // DashBoard
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "suppliers",
            element: (
              <AdminLayout>
                <SupplierList />
              </AdminLayout>
            ),
          },
          {
            path: "add-supplier",
            element: (
              <AdminLayout>
                <AddSupplier />
              </AdminLayout>
            ),
          },
          {
            path: "edit-supplier/:id",
            element: (
              <AdminLayout>
                <EditSupplier />
              </AdminLayout>
            ),
          },
          {
            path: "products",
            element: (
              <AdminLayout>
                <ProductList />
              </AdminLayout>
            ),
          },
          {
            path: "add-product",
            element: (
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            ),
          },
          {
            path: "edit-product/:id",
            element: (
              <AdminLayout>
                <EditProduct />
              </AdminLayout>
            ),
          },
        ],
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
