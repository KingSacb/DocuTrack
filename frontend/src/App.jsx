import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import NotFound from "./routes/NotFound";

const App  = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notfound" element={<NotFound />} />
        </Route>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
