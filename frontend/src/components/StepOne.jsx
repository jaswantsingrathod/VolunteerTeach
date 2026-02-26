import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StepOne = ({ form, updateField }) => {
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.contactNumber.trim() || !form.dateOfBirth) {
      toast.error("Please fill all required fields");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.contactNumber)) {
      toast.error("Contact number must be exactly 10 digits");
      return false;
    }

    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 20) {
      toast.error("Volunteers must be at least 20 years old");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/dashboard/step2");
    }
  };

  return (
    <Card className="border-rose-100 shadow-xl shadow-rose-100/50 overflow-hidden backdrop-blur-sm">
      <CardContent className="space-y-5 pt-8 -mt-4 bg-white rounded-t-3xl">
        <div className="space-y-1.5">
          <Label className="text-gray-700 font-semibold ml-1">Full Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="John Doe"
            className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-gray-700 font-semibold ml-1">Email Address *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@example.com"
            className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-gray-700 font-semibold ml-1">Contact Number *</Label>
          <Input
            value={form.contactNumber}
            onChange={(e) => updateField("contactNumber", e.target.value)}
            placeholder="ex - 99456..."
            className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-gray-700 font-semibold ml-1">Date of Birth *</Label>
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            className="h-11 rounded-xl border-rose-100 focus:ring-rose-200 focus:border-rose-400 transition-all"
          />
        </div>

        <div className="pt-6">
          <Button
            className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 hover:shadow-rose-400 transition-all duration-300 active:scale-[0.98] group"
            onClick={handleNext}
          >
            Continue to Volunteer Details
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepOne;