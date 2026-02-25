import { useDispatch } from "react-redux";
import axios from "@/config/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "@/slices/auth-slice";
import { toast } from "react-toastify";

const StepTwo = ({ form, updateField, toggleDay, setForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        updateField("latitude", lat);
        updateField("longitude", lng);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          updateField("location", data.display_name);
        } catch {
          toast.error("Unable to fetch address");
        }
      },
      () => toast.error("Location permission denied")
    );
  };

  const validateForm = () => {
    if (!form.location.trim()) {
      toast.error("Location is required");
      return false;
    }
    if (!form.languages.trim()) {
      toast.error("Languages are required");
      return false;
    }
    if (form.availability.length === 0) {
      toast.error("Please select at least one day of availability");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: form.name,
        email: form.email,
        contactNumber: form.contactNumber,
        dateOfBirth: form.dateOfBirth,
        languages: form.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter((lang) => lang !== ""),
        availability: form.availability,
        location: {
          address: form.location,
          latitude: form.latitude,
          longitude: form.longitude,
        },
      };

      await axios.post("/volunteer/register", payload, {
        headers: { Authorization: token },
      });

      localStorage.removeItem("volunteerFormDraft");
      toast.success("Application submitted successfully!");
      await dispatch(fetchProfile());

      setForm({
        name: "",
        email: "",
        contactNumber: "",
        dateOfBirth: "",
        location: "",
        latitude: null,
        longitude: null,
        languages: "",
        availability: [],
      });

      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card className="border-rose-100 shadow-xl shadow-rose-100/50 overflow-hidden bg-white/80 backdrop-blur-sm">
      <CardContent className="space-y-6 pt-8 -mt-4 bg-white rounded-t-3xl">
        <div className="space-y-2">
          <Label className="text-gray-700 font-semibold ml-1">Location *</Label>
          <div className="flex gap-2">
            <Input
              name="location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Your city or address"
              className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={fetchLocation}
              className="h-11 px-4 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors whitespace-nowrap"
            >
              📍 GPS
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-semibold ml-1">Languages (comma separated) *</Label>
          <Input
            name="languages"
            value={form.languages}
            onChange={(e) => updateField("languages", e.target.value)}
            placeholder="e.g. English, Spanish"
            className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-semibold ml-1">Weekly Availability *</Label>
          <div className="flex gap-2.5 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`
                  px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border
                  ${form.availability.includes(day)
                    ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white border-transparent shadow-lg shadow-rose-200 scale-105"
                    : "bg-white text-gray-500 border-gray-100 hover:border-rose-100 hover:text-rose-400 hover:bg-rose-50/30"
                  }
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            variant="ghost"
            className="flex-1 h-12 text-gray-400 font-bold hover:text-rose-500 hover:bg-rose-50 transition-all"
            onClick={() => navigate("/dashboard/step1")}
          >
            ← Back
          </Button>

          <Button
            className="flex-[2] h-12 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 hover:shadow-rose-400 transition-all duration-300 active:scale-[0.98]"
            onClick={handleSubmit}
          >
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTwo;