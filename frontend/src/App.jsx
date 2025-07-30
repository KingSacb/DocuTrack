import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import Profile from "./routes/profile";
import AdminDashboard from "./routes/admindashboard"
import NotFound from "./routes/NotFound";
import Unauthorized from "./routes/unauthorized"
import PrivateRoute from "./components/PrivateRoute";
import RequestForm from "./routes/requestform";

const App = () => (
  <Routes>
    <Route
      path="/profile"
      element={
        <PrivateRoute allowedRoles={["USER"]}>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route
      path="/requestform"
      element={
        <PrivateRoute allowedRoles={["USER"]}>
          <RequestForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <PrivateRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;

