import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import NotFound from "./routes/NotFound";
import Profile from "./routes/profile";
import ProtectedRoute from "./components/protectedRoute";

const App  = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
