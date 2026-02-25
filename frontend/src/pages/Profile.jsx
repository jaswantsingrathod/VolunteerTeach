import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchVolunteerProfile } from "@/slices/volunteer-slice";
import { logout } from "@/slices/auth-slice";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, hasFetched } = useSelector((state) => state.volunteer);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchVolunteerProfile());
    }
  }, [dispatch, hasFetched]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Only redirect if profile fetch is complete and profile is missing
  if (!profile && hasFetched) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 You have successfully registered!
          </h2>

          <p><strong>Name:</strong> {profile?.name || "-"}</p>
          <p><strong>Email:</strong> {profile?.email || "-"}</p>
          <p><strong>Contact:</strong> {profile?.contactNumber || "-"}</p>
          <p><strong>DOB:</strong> {profile?.dateOfBirth ? profile.dateOfBirth.split("T")[0] : "-"}</p>
          <p><strong>Location:</strong> {profile?.location?.address || "-"}</p>
          <p><strong>Languages:</strong> {Array.isArray(profile?.languages) ? profile.languages.join(", ") : "-"}</p>
          <p><strong>Availability:</strong> {Array.isArray(profile?.availability) ? profile.availability.join(", ") : "-"}</p>
        </CardContent>

      </Card>
      <div className="flex justify-center mt-6">
        <button
          className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-200 hover:shadow-rose-300 hover:shadow-lg transition-all duration-200 active:scale-95"
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;