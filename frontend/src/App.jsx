import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UserRegister from "./pages/UserRegister";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProfile } from "./slices/auth-slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchProfile());
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["volunteer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
