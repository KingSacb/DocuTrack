import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/users/profile");
        setUser(response.data.msg);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        alert("Sesión expirada o no autorizada");
        navigate("/login");
      }
    };

    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests");
        setRequests(res.data.data);
      } catch (err) {
        console.error("Error al obtener solicitudes:", err);
      }
    };

    getProfile();
    fetchRequests();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Perfil de Usuario
        </h1>

        {user ? (
          <div className="mb-6">
            <p>
              <strong>Correo:</strong> {user.email}
            </p>
            <p>
              <strong>Usuario:</strong> {user.username}
            </p>

            <div className="flex justify-between mt-4">
              <Link
                to="/requestform"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Solicitar Certificado
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">Mis Solicitudes</h2>

        {requests.length === 0 ? (
          <p>No has enviado ninguna solicitud aún.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Motivo</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Fecha solicitado</th>
                <th className="border px-4 py-2">Certificado</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="border px-4 py-2">{req.reason}</td>
                  <td className="border px-4 py-2">{req.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(req.created_at).toLocaleString("es-PA", {
                      timeZone: "America/Panama",
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2">
                    {req.status === "Emitido" && req.certificate_url ? (
                      <a
                        href={`http://localhost:3000/${req.certificate_url}`}
                        download
                      >
                        Descargar
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
