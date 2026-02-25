import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllVolunteers } from "@/slices/admin-slice";
import { logout } from "@/slices/auth-slice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { X } from "lucide-react";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { volunteers = [], loading, error } = useSelector((state) => state.admin);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllVolunteers());
  }, []);

  const openProfile = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const closeProfile = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <p className="text-rose-500 font-semibold text-lg animate-pulse">Loading volunteers...</p>
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Volunteer<span className="text-rose-500">Teach</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Admin Panel · Volunteer Management</p>
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md shadow-rose-200 hover:shadow-rose-300 transition-all duration-200"
          >
            Log Out
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

          {/* Card Header */}
          <div className="px-6 py-4 border-b border-rose-100 bg-gradient-to-r from-rose-500 to-pink-500">
            <h2 className="text-white font-bold text-lg tracking-tight">All Volunteers</h2>
            <p className="text-rose-100 text-xs mt-0.5">{volunteers.length} registered volunteer{volunteers.length !== 1 ? "s" : ""}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg py-2 px-3">
              {error}
            </div>
          )}

          {volunteers.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-sm">No volunteers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-rose-50 hover:bg-rose-50 border-b border-rose-200">
                    <TableHead className="text-rose-700 font-semibold border border-rose-200 px-3 py-3 text-xs uppercase tracking-wider w-[15%]">Name</TableHead>
                    <TableHead className="text-rose-700 font-semibold border border-rose-200 px-3 py-3 text-xs uppercase tracking-wider w-[25%]">Email</TableHead>
                    <TableHead className="text-rose-700 font-semibold border border-rose-200 px-3 py-3 text-xs uppercase tracking-wider w-[15%]">Contact</TableHead>
                    <TableHead className="text-rose-700 font-semibold border border-rose-200 px-3 py-3 text-xs uppercase tracking-wider">Location</TableHead>
                    <TableHead className="text-rose-700 font-semibold border border-rose-200 px-3 py-3 text-xs uppercase tracking-wider text-center w-[120px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.map((v) => (
                    <TableRow key={v._id} className="hover:bg-rose-50/50 transition-colors border-b border-rose-100">
                      <TableCell className="font-medium text-gray-800 border border-rose-100 px-3 py-2 text-sm align-middle">{v.name || "-"}</TableCell>
                      <TableCell className="text-gray-600 border border-rose-100 px-3 py-2 text-sm align-middle truncate max-w-[200px]" title={v.email}>{v.email || "-"}</TableCell>
                      <TableCell className="text-gray-600 border border-rose-100 px-3 py-2 text-sm align-middle">{v.contactNumber || "-"}</TableCell>
                      <TableCell className="text-gray-600 border border-rose-100 px-3 py-2 text-sm align-middle truncate max-w-[300px]" title={v.location?.address}>
                        {v.location?.address || "-"}
                      </TableCell>
                      <TableCell className="text-gray-600 border border-rose-100 px-3 py-2 text-sm align-middle text-center">
                        <button
                          onClick={() => openProfile(v)}
                          className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-200 border border-rose-200"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedVolunteer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <h3 className="text-lg font-bold">Volunteer Details</h3>
                <button
                  onClick={closeProfile}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-0">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="w-1/3 px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">{selectedVolunteer.name || "-"}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</td>
                      <td className="px-6 py-4 text-gray-900 font-medium break-all">{selectedVolunteer.email || "-"}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{selectedVolunteer.contactNumber || "-"}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Date of Birth</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {selectedVolunteer.dateOfBirth ? new Date(selectedVolunteer.dateOfBirth).toLocaleDateString() : "-"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{selectedVolunteer.location?.address || "-"}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Languages</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(selectedVolunteer.languages) && selectedVolunteer.languages.length > 0 ? (
                            selectedVolunteer.languages.map((lang, i) => (
                              <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-extrabold rounded-md uppercase border border-rose-100">
                                {lang}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(selectedVolunteer.availability) && selectedVolunteer.availability.length > 0 ? (
                            selectedVolunteer.availability.map((day, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-extrabold rounded-md uppercase border border-blue-100">
                                {day}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={closeProfile}
                  className="px-5 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

