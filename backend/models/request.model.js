import { db } from "../database/connection.database.js";

export const RequestModel = {
  async create({ user_id, full_name, document_type, file_url, birth_date, gender, reason }) {
    const result = await db.query(
      `INSERT INTO requests 
       (user_id, full_name, document_type, file_url, birth_date, gender, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, full_name, document_type, file_url, birth_date, gender, reason]
    );
    return result.rows[0];
  },

  async findByUserEmail(email) {
    const result = await db.query(
      `SELECT r.* FROM requests r
       JOIN users u ON u.uid = r.user_id
       WHERE u.email = $1
       ORDER BY r.created_at DESC`,
      [email]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT * FROM requests WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async updateStatus(id, newStatus) {
    const result = await db.query(
      `UPDATE requests SET status = $1 WHERE id = $2 RETURNING *`,
      [newStatus, id]
    );
    return result.rows[0];
  },

  async updateCertificateUrl(id, certificateUrl) {
    const result = await db.query(
      `UPDATE requests SET certificate_url = $1 WHERE id = $2 RETURNING *`,
      [certificateUrl, id]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(`SELECT * FROM requests ORDER BY created_at DESC`);
    return result.rows;
  },
};
