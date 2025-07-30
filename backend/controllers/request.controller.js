import { RequestModel } from "../models/request.model.js";

const createRequest = async (req, res) => {
  try {
    const { full_name, document_type, birth_date, gender } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ msg: "Archivo requerido" });

    const newRequest = await RequestModel.create({
      user_id: req.uid,
      full_name,
      document_type,
      file_url: file.path,
      birth_date,
      gender,
    });

    return res.status(201).json({ ok: true, request: newRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear solicitud" });
  }
};

export const RequestController = {
  createRequest,
};
