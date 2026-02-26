import { registerUser, resetError } from "@/slices/auth-slice.js";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function UserRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!form.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number."
      );
      return false;
    }
    return true;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Account created! Please login.");
      navigate("/login");
    } else {
      toast.error(res.payload || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-[40%_60%]">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-start bg-gradient-to-br from-rose-600 via-rose-500 to-pink-500 text-white p-10 relative overflow-hidden rounded-3xl my-28 ml-16">

        {/* Heading */}
        <h1 className="relative z-10 text-4xl font-extrabold leading-snug mb-3 tracking-tight">
          Volunteer<span className="text-rose-100">Teach</span>
        </h1>

        {/* Body text */}
        <p className="relative z-10 text-rose-100 text-base leading-relaxed max-w-xs">
          Join our volunteer community and help students learn in the
          language they understand best. Your time can change a child's future.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <Card className="w-[420px] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create Volunteer Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <div>
                <Label>Username *</Label>
                <Input
                  name="username"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Email *</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Password *</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-600">
                  Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number
                </p>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:shadow-lg transition-all duration-200 border-0"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    {/* <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg> */}
                    Registering...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-rose-500 font-semibold hover:text-rose-600 hover:underline transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserRegister;