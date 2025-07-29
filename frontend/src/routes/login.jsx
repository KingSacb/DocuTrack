import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { decodeToken } from "react-jwt"; // 👈 Import correcto
import API from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await API.post("/users/login", { email, password });
      const { msg: token } = response.data;

      localStorage.setItem("token", token);

      // 👇 Decodificar con react-jwt
      const decoded = decodeToken(token);
      const role = decoded?.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      const backendMsg = err.response?.data?.msg || "Error al iniciar sesión";
      setError(backendMsg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      const role = decoded?.role;
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

