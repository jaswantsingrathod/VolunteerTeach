import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, role, token } = useSelector((state) => state.user);

  if(!token) {
    return <Navigate to="/login" />
  }
  // Not logged in → go login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Role not allowed → go login
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;