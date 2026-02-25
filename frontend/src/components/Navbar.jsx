import { useDispatch } from "react-redux";
import { logout } from "@/slices/auth-slice";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-rose-100 px-6 py-3 shadow-sm shadow-rose-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md shadow-rose-200 group-hover:shadow-rose-300">
            <span className="text-xl">🎓</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Volunteer<span className="text-rose-500">Teach</span>
          </h1>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-6">

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
    </nav>
  );
}

export default Navbar;