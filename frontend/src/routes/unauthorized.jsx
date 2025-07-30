import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Acceso no autorizado
        </h1>
        <p className="text-gray-700 mb-6">
          No tienes permiso para ver esta página.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
