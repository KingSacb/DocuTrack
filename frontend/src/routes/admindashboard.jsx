import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/all");
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error al obtener solicitudes:", err);
      alert("No autorizado o error al cargar datos");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      await API.put(`/requests/${selectedRequest.id}/status`, {
        status: newStatus,
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id ? { ...r, status: newStatus } : r
        )
      );

      setSelectedRequest(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error al actualizar estado");
    }
  };

  const handleFileUpload = async (e, requestId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("certificate", file);

    try {
      await API.post(`/requests/${requestId}/certificate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Certificado subido correctamente");

      // Recargar solicitudes después de subir
      fetchRequests();
    } catch (error) {
      console.error("Error al subir certificado:", error);
      alert("Error al subir certificado");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>

      {requests.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Usuario</th>
              <th className="border px-4 py-2">Motivo</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Certificado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="border px-4 py-2">{req.email}</td>
                <td className="border px-4 py-2">{req.reason}</td>
                <td className="border px-4 py-2">
                  {new Date(req.created_at).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{req.status}</td>
                <td className="border px-4 py-2">
                  {req.status === "Emitido" ? (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, req.id)}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setSelectedRequest(req);
                      setShowModal(true);
                    }}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-900">
              Información del Usuario
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Nombre:</strong> {selectedRequest.full_name}
              </div>
              <div>
                <strong>Cédula:</strong> {selectedRequest.document_type}
              </div>
              <div>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(selectedRequest.birth_date).toLocaleDateString()}
              </div>
              <div>
                <strong>Género:</strong> {selectedRequest.gender}
              </div>
              <div>
                <strong>Motivo:</strong> {selectedRequest.reason}
              </div>
              <div>
                <strong>Estado:</strong> {selectedRequest.status}
              </div>
              <div className="col-span-2">
                <strong>Archivo:</strong>{" "}
                <a
                  href={`http://localhost:3000/${selectedRequest.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Ver
                </a>
              </div>
            </div>

            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={() => handleStatusChange("Emitido")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Aprobar
              </button>
              <button
                onClick={() => handleStatusChange("Rechazado")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Rechazar
              </button>
              <button
                onClick={() => handleStatusChange("Corrección Solicitada")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Pedir Corrección
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRequest(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
