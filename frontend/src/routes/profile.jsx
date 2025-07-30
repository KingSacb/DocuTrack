import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndRequests = async () => {
      try {
        const profileResponse = await API.get("/users/profile");
        setUser(profileResponse.data.msg);

        const requestsResponse = await API.get("/requests");
        setRequests(requestsResponse.data.data || []);
        console.log("Solicitudes recibidas:", requestsResponse.data.data);
      } catch (error) {
        console.error(
          "Error al obtener datos:",
          error.response?.data || error.message
        );
        alert(
          "Sesión expirada o no autorizada. Por favor inicia sesión nuevamente."
        );
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfileAndRequests();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Perfil de Usuario
        </h1>

        {user ? (
          <>
            <div className="text-center mb-6">
              <p>
                <strong>Correo:</strong> {user.email}
              </p>
              <p>
                <strong>Usuario:</strong> {user.username}
              </p>
              <div className="mt-4 space-x-4">
                <Link
                  to="/requestform"
                  className="text-blue-600 hover:underline"
                >
                  Solicitar Certificado
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Mis Solicitudes
            </h2>
            {requests.length === 0 ? (
              <p className="text-gray-600">
                Aún no has realizado ninguna solicitud.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {requests.map((req) => (
                  <li key={req.id} className="bg-gray-100 p-4 rounded shadow">
                    <p>
                      <strong>Motivo:</strong> {req.reason}
                    </p>
                    <p>
                      <strong>Estado:</strong> {req.status}
                    </p>
                    <p>
                      <strong>Fecha solicitado:</strong>{" "}
                      {new Date(req.created_at).toLocaleString("es-PA", {
                        timeZone: "America/Panama",
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-center">Cargando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
