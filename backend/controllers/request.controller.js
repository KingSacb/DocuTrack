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

export const RequestController = {
  createRequest,
  getUserRequests,
};
