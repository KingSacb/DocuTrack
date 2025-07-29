import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
