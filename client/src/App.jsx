
import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login, Register, Activate } from "./components";
import { HomePage, DashboardPage } from "./pages";

function App() {
  // const location = useLocation();
  // const isLogin = location.pathname === "/login" || "/register";
  return (
    <>
      {/* {!isLogin && <Header />} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
