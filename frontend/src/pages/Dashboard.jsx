import Navbar from "@/components/Navbar";
import FormTabs from "@/components/FormTabs";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.volunteer);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("volunteerFormDraft");
    return saved
      ? JSON.parse(saved)
      : {
        name: "",
        email: "",
        contactNumber: "",
        dateOfBirth: "",
        location: "",
        latitude: null,
        longitude: null,
        languages: "",
        availability: [],
      };
  });

  useEffect(() => {
    localStorage.setItem("volunteerFormDraft", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    if (profile) {
      navigate("/profile");
    }
  }, [profile, navigate]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day) => {
    setForm(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day],
    }));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading profile...</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-12 px-4 pb-20">
        <FormTabs />

        <div className="bg-white/50 backdrop-blur-sm rounded-3xl transition-all duration-500">
          <Routes>
            <Route path="/" element={<Navigate to="step1" replace />} />
            <Route
              path="step1"
              element={<StepOne form={form} updateField={updateField} />}
            />
            <Route
              path="step2"
              element={
                <StepTwo
                  form={form}
                  updateField={updateField}
                  toggleDay={toggleDay}
                  setForm={setForm}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
