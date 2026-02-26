import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginUser, resetError } from "@/slices/auth-slice.js";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, loading, error, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const [form, setForm] = useState({ email: "", password: "" });

  const validateForm = () => {
    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!form.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      if (res.payload.user.role === "admin") {
        navigate("/admin");
      } else if (res.payload.user.role === "volunteer") {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }
    }
  };

  // Demo Admin Login
  const handleDemoAdminLogin = async () => {
    const demoAdmin = { email: "jass@gmail.com", password: "jass123" };
    const res = await dispatch(loginUser(demoAdmin));
    if (res.meta.requestStatus === "fulfilled" && res.payload.user.role === "admin") {
      navigate("/admin");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "volunteer") {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <div className="min-h-screen grid md:grid-cols-[60%_40%]">

      {/* LEFT SIDE — Form */}
      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">

          {/* Logo / Brand */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Volunteer<span className="text-rose-500">Teach</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Sign in to continue your journey.
            </p>
          </div>

          {/* Divider line */}
          <div className="relative">
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400 tracking-widest">
                LOGIN TO YOUR ACCOUNT
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1">
              <Label className="text-gray-700 font-medium text-sm">Email Address *</Label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="h-11 border-gray-300 focus:border-rose-400 focus:ring-rose-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 font-medium text-sm">Password *</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="h-11 border-gray-300 focus:border-rose-400 focus:ring-rose-300 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md shadow-rose-200 hover:shadow-rose-300 hover:shadow-lg transition-all duration-200 border-0"
            >
              Sign In
            </Button>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-rose-500 font-semibold hover:text-rose-600 hover:underline transition-colors"
              >
                Create one
              </Link>
            </p>
            <div className="flex flex-col gap-3">
              {/* <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md shadow-rose-200 hover:shadow-rose-300 hover:shadow-lg transition-all duration-200 border-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Logging In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button> */}
              <Button
                type="button"
                variant="outline"
                className="w-full border border-rose-400 text-rose-600 font-semibold hover:bg-rose-50"
                onClick={handleDemoAdminLogin}
                disabled={loading}
              >
                Demo Admin Login
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Decorative Panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-rose-600 via-rose-500 to-pink-500 text-white p-10 relative overflow-hidden rounded-3xl my-28 mr-16">


        {/* Content */}
        <div className="relative z-10 text-center space-y-4">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">🎓</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold leading-snug tracking-tight">
            Make a Difference<br />
            <span className="text-rose-100">One Lesson at a Time</span>
          </h2>

          <p className="text-rose-100 text-sm leading-relaxed max-w-[220px] mx-auto">
            Connect with students who need your knowledge. Every session counts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;