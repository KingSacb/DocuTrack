import { RequestModel } from "../models/request.model.js";
import { db } from "../database/connection.database.js";

const createRequest = async (req, res) => {
  try {
    const { full_name, document_type, birth_date, gender, reason } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ msg: "Archivo requerido" });

    const newRequest = await RequestModel.create({
      user_id: req.uid,
      full_name,
      document_type,
      file_url: file.path,
      birth_date,
      gender,
      reason,
    });

    return res.status(201).json({ ok: true, request: newRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear solicitud" });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    console.log("UID desde token:", req.uid);
    const requests = await db.query(
      "SELECT * FROM requests WHERE user_id = $1 ORDER BY created_at DESC",
      [req.uid]
    );
    res.json({ ok: true, data: requests.rows });
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ msg: "Error al obtener las solicitudes" });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT r.*, u.email FROM requests r JOIN users u ON r.user_id = u.uid ORDER BY r.created_at DESC"
    );
    return res.json({ ok: true, requests: result.rows });
  } catch (error) {
    console.error("Error al obtener todas las solicitudes:", error);
    return res.status(500).json({ msg: "Error al obtener todas las solicitudes" });
  }
};

const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ msg: "Estado requerido" });
  }

  try {
    await db.query("UPDATE requests SET status = $1 WHERE id = $2", [status, id]);
    return res.json({ msg: "Estado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ msg: "Error al actualizar estado" });
  }
};


const uploadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "Archivo PDF requerido" });
    }

    const filePath = file.path;

    await db.query(
      "UPDATE requests SET certificate_url = $1 WHERE id = $2",
      [filePath, id]
    );

    res.json({ ok: true, msg: "Certificado cargado exitosamente" });
  } catch (error) {
    console.error("Error al subir certificado:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};




export const RequestController = {
  createRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
  uploadCertificate,
};
