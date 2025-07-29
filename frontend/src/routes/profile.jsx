import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/users/profile");
        setUser(response.data.msg);
      } catch (error) {
        console.error(
          "Error al obtener perfil:",
          error.response?.data || error.message
        );
        alert(
          "Sesión expirada o no autorizada. Por favor inicia sesión nuevamente."
        );
        navigate("/login");
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Perfil</h1>
        {user ? (
          <>
            <p className="mb-2">Correo: {user.email}</p>
            <p className="mb-4">Usuario: {user.username}</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
