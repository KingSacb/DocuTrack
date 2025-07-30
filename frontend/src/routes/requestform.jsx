import { useState } from "react";
import API from "../api/axios";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentId: "",
    birthDate: "",
    gender: "",
    reason: "",
    file: null,
  });

  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    data.append("full_name", `${formData.firstName} ${formData.lastName}`);
    data.append("document_type", `Cédula: ${formData.documentId}`);
    data.append("birth_date", formData.birthDate);
    data.append("gender", formData.gender);
    data.append("reason", reason);
    data.append("file", formData.file);

    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/requests", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setMessage("Solicitud enviada con éxito.");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setMessage("Ocurrió un error al enviar la solicitud.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Solicitud de Certificado
        </h2>

        {message && (
          <p className="text-center text-sm text-blue-600">{message}</p>
        )}

        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="documentId"
          placeholder="Cédula"
          value={formData.documentId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Seleccione sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Motivo de la solicitud
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            rows={3}
          />
        </div>
        <input
          type="file"
          name="file"
          accept=".pdf,.jpg,.jpeg"
          onChange={handleChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
